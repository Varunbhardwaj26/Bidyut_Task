import os
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from db import engine
from models import Base
from routers.jobs import router as job_router
from routers.auth import router as auth_router
####
from routers.otp_router import router as otp_router
from routers.user_router import router as user_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    #  "https://hgmznt0f-5173.inc1.devtunnels.ms"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#####

Base.metadata.create_all(bind=engine)

app.include_router(
    otp_router,
    prefix="/otp",
    tags=["OTP"]
    )
app.include_router(
    user_router,
    prefix ="/apply",
    tags=["Applicants"]
)
app.include_router(
    job_router,
    prefix ="/jobs",
    tags=["Jobs"])

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

@app.get("/")
def root():
    return {"message": "Job Portal API is running"}