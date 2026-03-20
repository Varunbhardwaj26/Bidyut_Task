import os
from fastapi import APIRouter, HTTPException, status
from schema import OTPStartReq, OTPStartRes, OTPVerifyReq, OTPVerifyRes
from core.redis_client import redis_job
from utils.otp_utils import generate_otp_4, hash_otp, verify_otp, OTP_TTL_SECONDS
from core.twilio_service import send_otp_sms

# --- env ---
OTP_SECRET = os.getenv("OTP_SECRET")

router = APIRouter()#prefix="/otp", tags=["OTP"]

@router.post("/start", response_model=OTPStartRes)
def start_otp(payload: OTPStartReq):
    if not OTP_SECRET:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail="OTP_SECRET missing in env")

    phone = payload.phone.strip().replace(" ", "")
    if not phone.startswith("+"):
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Phone must be in E.164 format like +9198xxxx")

    otp_key = f"otp:{phone}"
    attempts_key = f"otp_attempts:{phone}"

    # --- THE FIX: Check if an OTP is already active ---
    current_ttl = redis_job.ttl(otp_key)
    if current_ttl is not None and current_ttl > 0:
        # If TTL is > 0, the previous OTP is still valid. Block the request.
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS, 
            detail=f"OTP already sent. Please wait {current_ttl} seconds before requesting a new one."
        )

    # If we pass the check, generate and store the new OTP
    otp = generate_otp_4()
    otp_h = hash_otp(otp, OTP_SECRET)

    # store in redis 
    redis_job.setex(otp_key, OTP_TTL_SECONDS, otp_h)
    redis_job.setex(attempts_key, OTP_TTL_SECONDS, 0)

    # send by sms
    try:
        send_otp_sms(phone, otp)
    except Exception as e:
        redis_job.delete(otp_key)
        redis_job.delete(attempts_key)
        raise HTTPException(status_code=502, detail=f"OTP send failed: {str(e)}")

    return OTPStartRes(message="OTP sent", expires_in=OTP_TTL_SECONDS)
# @router.post("/start", response_model=OTPStartRes)
# def start_otp(payload: OTPStartReq):
#     if not OTP_SECRET:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail="OTP_SECRET missing in env")

#     phone = payload.phone.strip().replace(" ", "")
#     if not phone.startswith("+"):
#         raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Phone must be in E.164 format like +9198xxxx")

    
#     otp = generate_otp_4()

    
#     otp_h = hash_otp(otp, OTP_SECRET)

#     # store in redis 
#     otp_key = f"otp:{phone}"
#     attempts_key = f"otp_attempts:{phone}"
#     redis_job.setex(otp_key, OTP_TTL_SECONDS, otp_h)
#     redis_job.setex(attempts_key, OTP_TTL_SECONDS, 0)

#     # 4) send by sms
#     try:
#         send_otp_sms(phone, otp)
#     except Exception as e:
#         redis_job.delete(otp_key)
#         redis_job.delete(attempts_key)
#         raise HTTPException(status_code=502, detail=f"OTP send failed: {str(e)}")

#     return OTPStartRes(message="OTP sent", expires_in=OTP_TTL_SECONDS)

@router.post("/verify", response_model=OTPVerifyRes)
def verify_otp_route(payload: OTPVerifyReq):
    if not OTP_SECRET:
        raise HTTPException(status_code=500, detail="OTP_SECRET missing in env")

    phone = payload.phone.strip().replace(" ", "")
    otp = payload.otp.strip()

    otp_key = f"otp:{phone}"
    attempts_key = f"otp_attempts:{phone}"

    # 1. Fetch data
    otp_h = redis_job.get(otp_key)
    if not otp_h:
        raise HTTPException(status_code=400, detail="OTP expired or not started")

    attempts = redis_job.get(attempts_key)
    attempts_int = int(attempts) if attempts is not None else 0
    
    if attempts_int >= 5:
        raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")

    # 2. Verify OTP
    ok = verify_otp(otp, otp_h, OTP_SECRET)
    if not ok:
        # Increment attempts
        redis_job.incr(attempts_key)
        
        # PREVENT MEMORY LEAK: Sync the attempts expiration with the OTP expiration
        ttl = redis_job.ttl(otp_key)
        if ttl is not None and ttl > 0:
            redis_job.expire(attempts_key, ttl)
            
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    # 3. Success: Mark as verified and cleanup
    verified_key = f"verified:{phone}"
    redis_job.setex(verified_key, 600, "1")  # valid for 10 minutes
    
    redis_job.delete(otp_key)
    redis_job.delete(attempts_key)

    return OTPVerifyRes(message="OTP verified")

# @router.post("/verify", response_model=OTPVerifyRes)
# def verify_otp_route(payload: OTPVerifyReq):
#     if not OTP_SECRET:
#         raise HTTPException(status_code=500, detail="OTP_SECRET missing in env")

#     phone = payload.phone.strip().replace(" ", "")
#     otp = payload.otp.strip()

#     otp_key = f"otp:{phone}"
#     attempts_key = f"otp_attempts:{phone}"

#     otp_h = redis_job.get(otp_key)
#     if not otp_h:
#         raise HTTPException(status_code=400, detail="OTP expired or not started")

#     attempts = redis_job.get(attempts_key)
#     attempts_int = int(attempts) if attempts is not None else 0
#     if attempts_int >= 5:
#         raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")

#     ok = verify_otp(otp, otp_h, OTP_SECRET)
#     if not ok:
#         redis_job.incr(attempts_key)
#         raise HTTPException(status_code=400, detail="Invalid OTP")
    
#     verified_key = f"verified:{phone}"
#     redis_job.setex(verified_key, 600, "1")  # valid for 10 minutes and returns 1

#     # success: cleanup
#     redis_job.delete(otp_key)
#     redis_job.delete(attempts_key)

#     return OTPVerifyRes(message="OTP verified")


