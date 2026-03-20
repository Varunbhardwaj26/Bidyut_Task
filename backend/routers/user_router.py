from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from pydantic import EmailStr
from sqlalchemy.orm import Session
from typing import List
from utils.drivers_utils import upload_to_drive , file_to_trash #, create_job_folder
from db import get_db
from models import Job, Application
from schema import JobResponse
#
from dependecies.application_form import Application_Form
#
from core.redis_client import redis_job
router = APIRouter()



@router.get("/open_jobs_user", response_model= List[JobResponse])
def open_jobs(db:Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.is_open == "open").order_by(Job.id.asc()).all()
    return jobs


#add try except
@router.post("/{job_id}/apply")
def apply_applicant(
    job_id: int,
    form_data: Application_Form = Depends(),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    #  Check job exists and is open
    job = db.query(Job).filter(Job.id == job_id, Job.is_open == "open").first()
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found or closed"
        )
    # if not job.folder_id():
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         details="Job folder not found"
    #     ) remove below


    verified_key = f"verified:{form_data.phone_no}"
    
    if redis_job.get(verified_key) != "1":
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED,detail="Phone number not OTP verified")
    
    existing = db.query(Application).filter(Application.phone_no == form_data.phone_no).first() #1 apply per job,Application.job_id == job_id
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail = "You have already applied")


    #     #Upload resume to Google Drive
    # else:
    #     resume_url = upload_to_drive(resume) #.file,# resume.filename,# resume.content_type
#     verified_key = f"verified:{phone_no}"
#     verification_status = redis_job.get(verified_key)

# # Check explicit verification value
#     if verification_status != b"true":   ### redis should return "true" for this change in redisfile
#       raise HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Phone number not OTP verified"
#     )

    content = resume.file.read()
    resume.file.seek(0)
    if len(content) > 200 * 1024:
        raise HTTPException(status_code=413, detail="Resume must be less than 200KB")


    resume_url = upload_to_drive(resume) #, job.folder_id

    if not resume_url:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="Failed to upload resume to Google Drive"
            
        )
    
    application_data = vars(form_data) # dependency object to dcitionary
    application_data["job_id"] = job_id
    application_data["resume_url"] = resume_url
    application = Application(**application_data) 

    db.add(application)
    db.commit()
    # redis_job.delete(verified_key)
    db.refresh(application)

    return {"message": "Application submitted successfully"}
