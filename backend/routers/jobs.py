from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from pydantic import EmailStr
from sqlalchemy.orm import Session
from typing import List
from utils.drivers_utils import upload_to_drive, file_to_trash  # , create_job_folder
from db import get_db
from models import Job, Application
from schema import JobCreate, JobUpdate, JobResponse, ApplicantAdminView, ApplicantCreate
from security import admin_access
from core.redis_client import redis_job

router = APIRouter()

# applicant
# @router.get("/open_jobs_user", response_model= List[JobResponse])
# def open_jobs(db:Session = Depends(get_db)):
#     jobs = db.query(Job).filter(Job.is_open == True).order_by(Job.id.asc()).all()
#     return jobs

# ===== OLD APPLY JOB ROUTE COMMENTED - DO NOT DELETE =====
# @router.post("/job/{job_id}/apply") #put
# def apply_applicant(job_id : int, applicant : ApplicantCreate, db : Session = Depends(get_db)):
#     job = db.query(Job).filter(Job.id == job_id, Job.is_open == True).first()
#     if not job :
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail ="Job not found or closed")
#     application = Application(
#         **applicant.model_dump(),
#         job_id=job_id
#     )
#     db.add(application)
#     db.commit()
#     db.refresh(application)
#     return application
# ===== END OLD APPLY JOB ROUTE =====

# # ===== NEW APPLY JOB ROUTE FOR FRONTEND FORM DATA =====
# @router.post("/job/{job_id}/apply")
# def apply_applicant(
#     job_id: int,
#     name: str = Form(...),
#     email: EmailStr = Form(...),
#     phone_no: str = Form(...),
#     currentCity: str = Form(...),
#     parentName: str = Form(...),
#     parentOccupation: str = Form(...),
#     parentPhone: str = Form(...),
#     collegeName: str = Form(...),
#     graduationYear: str = Form(...),
#     branch: str = Form(...),
#     linkedin: str = Form(...),
#     github: str = Form(...),
#     technicalChallenge: str = Form(...),
#     missingSkills: str = Form(...),
#     guidanceNeeded: str = Form(...),
#     currentStand: str = Form(...),
#     engagementPlan: str = Form(...),
#     expectedOutcomes: str = Form(...),
#     resume: UploadFile = File(...),
#     db: Session = Depends(get_db),
# ):
#     job = db.query(Job).filter(Job.id == job_id, Job.is_open == "open").first()
#     if not job:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Job not found or closed"
#         )

#     existing_application = db.query(Application).filter(
#         Application.job_id == job_id,
#         Application.email == email
#     ).first()

#     if existing_application:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="You have already applied for this job with this email."
#         )

#     try:
#         resume_url = upload_to_drive(resume)
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Resume upload failed: {str(e)}"
#         )

#     application = Application(
#         job_id=job_id,
#         name=name,
#         email=email,
#         phone_no=phone_no,
#         resume_url=resume_url,
#         current_city=currentCity,
#         parent_name=parentName,
#         parent_occupation=parentOccupation,
#         parent_phone=parentPhone,
#         college_name=collegeName,
#         graduation_year=graduationYear,
#         branch=branch,
#         linkedin_url=linkedin,
#         github_url=github,
#         technical_challenge=technicalChallenge,
#         missing_skills=missingSkills,
#         guidance_needed=guidanceNeeded,
#         current_stand=currentStand,
#         engagement_plan=engagementPlan,
#         expected_outcomes=expectedOutcomes,
#     )

#     db.add(application)
#     db.commit()
#     db.refresh(application)

#     return {
#         "message": "Application submitted successfully",
#         "application_id": application.id,
#         "resume_url": application.resume_url
#     }
# # ===== END NEW APPLY JOB ROUTE =====

# View application by admin
@router.get("/{job_id}/applications", response_model=list[ApplicantAdminView])
def view_applications_of_job(job_id: int, db: Session = Depends(get_db), admin=Depends(admin_access)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )
    applications = db.query(Application).filter(Application.job_id == job_id).all()
    return applications

######
@router.get("/User_search_jobs_by_title", response_model=List[JobResponse])
def user_title(title: str, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.title.ilike(f"%{title}%"), Job.is_open == "open").order_by(Job.id.asc()).all()
    if not jobs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Jobs not found")
    return jobs

@router.get("/get_all_jobs", response_model=List[JobResponse])
def get_all_jobs(db: Session = Depends(get_db), admin=Depends(admin_access)):
    jobs = db.query(Job).order_by(Job.id.asc()).all()
    return jobs

@router.get("/get_by_title", response_model=List[JobResponse])
def get_by_title(title: str, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.title.ilike(f"%{title}%")).order_by(Job.id.asc()).all()
    if not jobs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Jobs not found")
    return jobs

@router.post("/create_job", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db), admin=Depends(admin_access)):
    new_job = Job(
        type=job.type,
        title=job.title,
        description=job.description,
        min_experience=job.min_experience,
        max_experience=job.max_experience,
        location=job.location,
        mode=job.mode,
        compensation=job.compensation,
        compensation_type=job.compensation_type,
        is_open=job.is_open
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

# @router.post("/create_job", response_model=JobResponse)
# def create_job(job: JobCreate, db: Session = Depends(get_db), admin = Depends(admin_access)):
#     try:
#         new_job = Job(
#             type=job.type,
#             title=job.title,
#             description=job.description,
#             min_experience=job.min_experience,
#             max_experience=job.max_experience,
#             location=job.location,
#             mode=job.mode,
#             compensation=job.compensation,
#             compensation_type=job.compensation_type,
#             is_open=job.is_open
#         )
#
#         db.add(new_job)
#         db.flush()
#         folder_name = f"job_{new_job.id}_{new_job.title}"
#         folder_id = create_job_folder(folder_name)
#         new_job.folder_id = folder_id
#
#         db.commit()
#         db.refresh(new_job)
#         return new_job
#     except Exception as e:
#         db.rollback()
#         print("ERROR:", e)
#         raise

# @router.post("/update_jobs", response_model= JobResponse)
# def update_job(job_id: int, job_update: JobUpdate, db: Session = Depends(get_db), admin = Depends(admin_access)):
#     # Fetch job from db
#     db_job = db.query(Job).filter(Job.id == job_id).first()
#     if not db_job:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Jobs not found")
#     # for key, value in job_update.model_dump(exclude_unset=True).items():
#     #     setattr(db_job, key, value)
#
#     for key, value in job_update.dict(exclude_unset=True).items():
#         setattr(db_job, key, value)
#
#     db.commit()
#     db.refresh(db_job)
#     return db_job

@router.patch("/update_jobs/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int,
    job_update: JobUpdate,
    db: Session = Depends(get_db),
    admin=Depends(admin_access)
):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    for key, value in job_update.model_dump(exclude_unset=True).items():
        setattr(db_job, key, value)

    db.commit()
    db.refresh(db_job)
    return db_job

# @router.delete("/delete_job")
# def delete_job(job_id: int, db: Session = Depends(get_db), admin = Depends(admin_access)):
#     db_job = db.query(Job).filter(Job.id == job_id).first()
#     if not db_job:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
#
#    try: db.delete(db_job)
#     db.commit()
#     #db.refresh(db_job) ####
#     return {"message": f"Job '{db_job.title}' deleted successfully"}

@router.delete("/delete_job/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_access)
):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    job_title = db_job.title

    applications = db.query(Application).filter(
        Application.job_id == job_id
    ).all()

    for app in applications:
        if app.resume_url:
            try:
                file_id = app.resume_url.split("/d/")[1].split("/")[0]
                file_to_trash(file_id)
            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to move resume to trash for application {app.id}"
                )

    try:
        db.delete(db_job)
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database deletion failed"
        )

    return {
        "message": f"Job '{job_title}' and its applications deleted."
    }