from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from datetime import datetime, timezone
from sqlalchemy.sql import func
from db import Base #, relationship


class Job(Base):
    __tablename__ = "job_posting"

    id = Column(Integer, primary_key=True, index=True)
    #folder_id = Column(String, nullable=False) ##
    type = Column(String(50), nullable=False)  
    title = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    min_experience = Column(Integer, nullable=False)
    max_experience = Column(Integer, nullable=False)
    location = Column(String(50), nullable=False)
    mode = Column(String(50), nullable=False) 
    compensation = Column(Integer, nullable=False)
    compensation_type = Column(String(50), nullable=False)  
    is_open = Column(String, nullable=False, default="open") #boolean
    created_at = Column(DateTime(timezone=True), server_default=func.now())#datetime.timezone.utc
    

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key= True, index = True)
    name = Column(String(50), nullable= False)
    email = Column(String(50), nullable= False, unique= True)
    hashed_password = Column(String(255), nullable= False)
    #role = Column(String(50), nullable= False, default= "admin")
    level = Column(String(50), nullable=False)

class Application(Base):
    __tablename__ = "job_application"
    id = Column(Integer, primary_key= True, index = True)
    name = Column(String(50), nullable= False)
    email = Column(String(50), nullable= False, unique= True)
    phone_no = Column(String(13), nullable= False, unique= True)#strin,
    resume_url = Column(Text, nullable=False)
    job_id = Column(Integer,ForeignKey("job_posting.id", ondelete ="CASCADE"),nullable= False)
    current_city = Column(String(200), nullable=False)
    parent_name = Column(String(200), nullable=False)
    parent_occupation = Column(String(200), nullable=False)
    parent_phone = Column(String(20), nullable=False)
    college_name = Column(String(255), nullable=False)
    graduation_year = Column(String(20), nullable=False)
    branch = Column(String(100), nullable=False)
    # domain = Column(String(100), nullable=False)
    linkedin_url = Column(String(500), nullable=False)
    github_url = Column(String(500), nullable=False)
    technical_challenge = Column(Text, nullable=False)
    missing_skills = Column(Text, nullable=False)
    guidance_needed = Column(Text, nullable=False)
    current_stand = Column(Text, nullable=False)
    engagement_plan = Column(Text, nullable=False)
    expected_outcomes = Column(Text, nullable=False)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())#
