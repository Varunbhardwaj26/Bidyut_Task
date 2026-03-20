from pydantic import BaseModel, EmailStr, constr, Field, model_validator, field_serializer
from typing import Optional
from datetime import datetime, timezone #, date
from zoneinfo import ZoneInfo
from enum import Enum
# from fastapi import HTTPException , status


class JobMode(str,Enum):
    remote = "Remote"
    hybrid = "Hybrid"
    onsite = "On-Site"
class JobStatus(str,Enum):
    open = "open"
    closed = "closed"
class JobCompType(str, Enum):
    stipend = "Stipend"
    salary = "Salary"

# def status_to_bool(value):
#     if value is None:
#         return None
#     if value in (True, False):
#         return value
#     if value == "open":
#         return True
#     if value == "closed":
#         return False
#     raise ValueError("Status must be 'open' or 'closed'")

class JobCreate(BaseModel):
    type: str 
    title: str 
    description: str
    min_experience: int = Field(ge= 0)
    max_experience: int = Field(ge= 0)
    location: str 
    mode: JobMode 
    compensation: int
    compensation_type: JobCompType 
    is_open: JobStatus #bool = True
    
    @model_validator(mode= 'after')
    def Check(self):
        if self.max_experience < self.min_experience:
            raise ValueError("max_experience cannot be less than min_experience")
        return self
    # @field_validator("is_open", mode="before")
    # @classmethod
    # def convert_to_bool(cls,value):
    #     return status_to_bool(value)

class JobUpdate(BaseModel):
    is_open: Optional[JobStatus] = None
    # @field_validator("is_open", mode= "before")
    # @classmethod
    # def convert_to_bool(cls,value):
    #     return status_to_bool(value)
    type: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    min_experience: Optional[int] = None
    max_experience: Optional[int] = None
    location: Optional[str] = None
    mode: Optional[str] = None
    compensation: Optional[int] = None
    compensation_type: Optional[str] = None
    class Config:
        extra = "forbid"

class JobResponse(BaseModel):
    id: int
    type: str
    title: str
    description: str
    min_experience: int
    max_experience: int
    location: str
    mode: str
    compensation: int
    compensation_type: str
    is_open: str
    created_at: datetime
   
    
    class Config:
        from_attributes = True
    @field_serializer("created_at")
    def format_created_at(self, value: datetime):
        return value.strftime("%d-%m-%Y %I:%M %p")

 # @field_validator("is_open", mode="before")
    # @classmethod
    # def convert_bool_string(cls,data):
    #     return "open" if data else "closed"


class AdminCreate(BaseModel):
    name : str
    email : EmailStr
    password : str


class AdminLogin(BaseModel):
    email : EmailStr
    password : str


class AdminResponse(BaseModel):
    id : int
    name : str
    email : EmailStr
    level : str

    class Config:
        from_attributes = True

class AdminLoginResponse(BaseModel): 
    message: str
    access_token: str
    token_type: str

class ApplicantCreate(BaseModel):
    name : str
    email : EmailStr
    resume_url : str
    phone_no : str = Field(pattern=r'^\+91\d{10}$')   #string if not work  phone_no: constr(pattern=r'^(\+91)?[0-9]{10}$')

    # @field_validator (phone_no)
    # @classmethod
    # def Validation_Phone(cls, data):     #cls(class) is there for to check data if it fits the rules
    #     data = data.strip()
    #     if data.isdigit() and len(data) == 10:
    #         return  data
    #     else :
    #         raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Invalid phone no")


class ApplicantAdminView(BaseModel):
    id: int
    job_id: int
    name: str
    email: EmailStr
    phone_no: str   #str
    resume_url: str
    current_city: str
    parent_name: str
    parent_occupation: str
    parent_phone: str
    college_name: str
    graduation_year: str
    branch: str
    linkedin_url: str
    github_url: str
    technical_challenge: str
    missing_skills: str
    guidance_needed: str
    current_stand: str
    engagement_plan: str
    expected_outcomes: str
    applied_at: datetime

    class Config:
        from_attributes = True
    @field_serializer("applied_at")
    def format_created_at(self, value: datetime):
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        ist_time= value.astimezone(ZoneInfo("Asia/Kolkata"))
        return ist_time.strftime("%d-%m-%Y %I:%M %p")




class OTPStartReq(BaseModel):
    phone: str = Field(..., examples=["+91XXXXXXXXXX"])


class OTPStartRes(BaseModel):
    message: str
    expires_in: int


class OTPVerifyReq(BaseModel):
    phone: str = Field(..., examples=["+91XXXXXXXXXX"])
    otp: str = Field(...) #,examples=["1234"]


class OTPVerifyRes(BaseModel):
    message: str