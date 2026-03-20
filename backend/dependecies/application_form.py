# from fastapi import Form
# from pydantic import EmailStr
# #testing for 

# class Application_Form:
#     def __init__(
#         self,
#         name: str = Form(...),
#         email: EmailStr = Form(...),
#         phone_no: str = Form(..., pattern=r'^\+91[6-9]\d{9}$',examples=["+91XXXXXXXXXX"]),

#         current_city: str = Form(...),

#         parent_name: str = Form(...),
#         parent_occupation: str = Form(...),
#         parent_phone: str = Form(...,pattern=r'^\+91[6-9]\d{9}$',examples=["+91XXXXXXXXXX"]),

#         college_name: str = Form(...),
#         graduation_year: str = Form(...),
#         branch: str = Form(...),
    

#         linkedin_url: str = Form(...),
#         github_url: str = Form(...),

#         technical_challenge: str = Form(...),
#         missing_skills: str = Form(...),
#         guidance_needed: str = Form(...),
#         current_stand: str = Form(...),
#         engagement_plan: str = Form(...),
#         expected_outcomes: str = Form(...),
#     ):
#         self.name = name
#         self.email = email
#         self.phone_no = phone_no

#         self.current_city = current_city

#         self.parent_name = parent_name
#         self.parent_occupation = parent_occupation
#         self.parent_phone = parent_phone

#         self.college_name = college_name
#         self.graduation_year = graduation_year
#         self.branch = branch


#         self.linkedin_url = linkedin_url
#         self.github_url = github_url

#         self.technical_challenge = technical_challenge
#         self.missing_skills = missing_skills
#         self.guidance_needed = guidance_needed
#         self.current_stand = current_stand
#         self.engagement_plan = engagement_plan
#         self.expected_outcomes = expected_outcomes

from fastapi import Form, HTTPException
from pydantic import EmailStr, AnyHttpUrl
import re


class Application_Form:
    def __init__(
        self,
        name: str = Form(...),
        email: EmailStr = Form(...),
        phone_no: str = Form(...),

        current_city: str = Form(...),

        parent_name: str = Form(...),
        parent_occupation: str = Form(...),
        parent_phone: str = Form(...),

        college_name: str = Form(...),
        graduation_year: str = Form(...),
        branch: str = Form(...),

        linkedin_url: str = Form(...),
        github_url: str = Form(...),

        technical_challenge: str = Form(...),
        missing_skills: str = Form(...),
        guidance_needed: str = Form(...),
        current_stand: str = Form(...),
        engagement_plan: str = Form(...),
        expected_outcomes: str = Form(...),
    ):
        # ---------- clean / strip ----------
        name = name.strip()
        email = str(email).strip()
        phone_no = phone_no.strip()

        current_city = current_city.strip()

        parent_name = parent_name.strip()
        parent_occupation = parent_occupation.strip()
        parent_phone = parent_phone.strip()

        college_name = college_name.strip()
        graduation_year = graduation_year.strip()
        branch = branch.strip()

        linkedin_url = linkedin_url.strip()
        github_url = github_url.strip()

        technical_challenge = technical_challenge.strip()
        missing_skills = missing_skills.strip()
        guidance_needed = guidance_needed.strip()
        current_stand = current_stand.strip()
        engagement_plan = engagement_plan.strip()
        expected_outcomes = expected_outcomes.strip()

        # ---------- required checks ----------
        if not name:
            raise HTTPException(status_code=422, detail="Name is required")

        if not current_city:
            raise HTTPException(status_code=422, detail="Current city is required")

        if not parent_name:
            raise HTTPException(status_code=422, detail="Parent name is required")

        if not parent_occupation:
            raise HTTPException(status_code=422, detail="Parent occupation is required")

        if not college_name:
            raise HTTPException(status_code=422, detail="College name is required")

        if not graduation_year:
            raise HTTPException(status_code=422, detail="Graduation year is required")

        if not branch:
            raise HTTPException(status_code=422, detail="Branch is required")

        if not linkedin_url:
            raise HTTPException(status_code=422, detail="LinkedIn URL is required")

        if not github_url:
            raise HTTPException(status_code=422, detail="GitHub URL is required")

        if not technical_challenge:
            raise HTTPException(status_code=422, detail="Technical challenge is required")

        if not missing_skills:
            raise HTTPException(status_code=422, detail="Missing skills field is required")

        if not guidance_needed:
            raise HTTPException(status_code=422, detail="Guidance needed field is required")

        if not current_stand:
            raise HTTPException(status_code=422, detail="Current stand is required")

        if not engagement_plan:
            raise HTTPException(status_code=422, detail="Engagement plan is required")

        if not expected_outcomes:
            raise HTTPException(status_code=422, detail="Expected outcomes field is required")

        # ---------- regex helpers ----------
        name_pattern = r"^[A-Za-z][A-Za-z\s.'-]{1,99}$"
        city_pattern = r"^[A-Za-z][A-Za-z\s.'-]{1,99}$"
        occupation_pattern = r"^[A-Za-z0-9][A-Za-z0-9\s&.,'()/-]{1,99}$"
        branch_pattern = r"^[A-Za-z0-9][A-Za-z0-9\s&.,'()/-]{1,99}$"
        college_pattern = r"^[A-Za-z0-9][A-Za-z0-9\s&.,'()/-]{1,199}$"
        phone_pattern = r"^\+91[6-9]\d{9}$"

        # ---------- format checks ----------
        if len(name) < 2 or len(name) > 100 or not re.fullmatch(name_pattern, name):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid full name"
            )

        if len(parent_name) < 2 or len(parent_name) > 100 or not re.fullmatch(name_pattern, parent_name):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid parent name"
            )

        if len(current_city) < 2 or len(current_city) > 100 or not re.fullmatch(city_pattern, current_city):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid current city"
            )

        if len(parent_occupation) < 2 or len(parent_occupation) > 100 or not re.fullmatch(occupation_pattern, parent_occupation):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid parent occupation"
            )

        if len(college_name) < 2 or len(college_name) > 200 or not re.fullmatch(college_pattern, college_name):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid college name"
            )

        if len(branch) < 2 or len(branch) > 100 or not re.fullmatch(branch_pattern, branch):
            raise HTTPException(
                status_code=422,
                detail="Enter a valid branch"
            )

        if not re.fullmatch(phone_pattern, phone_no):
            raise HTTPException(
                status_code=422,
                detail="Phone number must be in +91XXXXXXXXXX format"
            )

        if not re.fullmatch(phone_pattern, parent_phone):
            raise HTTPException(
                status_code=422,
                detail="Parent phone number must be in +91XXXXXXXXXX format"
            )

        # ---------- year validation ----------
        allowed_years = {"2022", "2023", "2024", "2025", "2026", "2027", "2028"}
        if graduation_year not in allowed_years:
            raise HTTPException(
                status_code=422,
                detail="Select a valid graduation year"
            )

        # ---------- URL validation ----------
        try:
            linkedin_parsed = AnyHttpUrl(linkedin_url)
        except Exception:
            raise HTTPException(
                status_code=422,
                detail="Enter a valid LinkedIn URL"
            )

        try:
            github_parsed = AnyHttpUrl(github_url)
        except Exception:
            raise HTTPException(
                status_code=422,
                detail="Enter a valid GitHub URL"
            )

        linkedin_url_str = str(linkedin_parsed)
        github_url_str = str(github_parsed)

        if "linkedin.com" not in linkedin_url_str.lower():
            raise HTTPException(
                status_code=422,
                detail="LinkedIn URL must be from linkedin.com"
            )

        if "github.com" not in github_url_str.lower():
            raise HTTPException(
                status_code=422,
                detail="GitHub URL must be from github.com"
            )

        # ---------- textarea size checks ----------
        if len(technical_challenge) < 20 or len(technical_challenge) > 3000:
            raise HTTPException(
                status_code=422,
                detail="Technical challenge must be between 20 and 3000 characters"
            )

        if len(missing_skills) < 10 or len(missing_skills) > 2000:
            raise HTTPException(
                status_code=422,
                detail="Missing skills must be between 10 and 2000 characters"
            )

        if len(guidance_needed) < 10 or len(guidance_needed) > 2000:
            raise HTTPException(
                status_code=422,
                detail="Guidance needed must be between 10 and 2000 characters"
            )

        if len(expected_outcomes) < 10 or len(expected_outcomes) > 2000:
            raise HTTPException(
                status_code=422,
                detail="Expected outcomes must be between 10 and 2000 characters"
            )

        # ---------- radio value validation ----------
        allowed_current_stand = {
            "strong_ai",
            "gaps_need_training",
            "limited_knowledge",
        }
        if current_stand not in allowed_current_stand:
            raise HTTPException(
                status_code=422,
                detail="Invalid current stand selected"
            )

        allowed_engagement_plan = {
            "pay_personally",
            "partial_scholarship",
            "fully_sponsored",
        }
        if engagement_plan not in allowed_engagement_plan:
            raise HTTPException(
                status_code=422,
                detail="Invalid engagement plan selected"
            )

        # ---------- final assignment ----------
        self.name = name
        self.email = email
        self.phone_no = phone_no
        self.current_city = current_city
        self.parent_name = parent_name
        self.parent_occupation = parent_occupation
        self.parent_phone = parent_phone
        self.college_name = college_name
        self.graduation_year = graduation_year
        self.branch = branch
        self.linkedin_url = linkedin_url_str
        self.github_url = github_url_str
        self.technical_challenge = technical_challenge
        self.missing_skills = missing_skills
        self.guidance_needed = guidance_needed
        self.current_stand = current_stand
        self.engagement_plan = engagement_plan
        self.expected_outcomes = expected_outcomes