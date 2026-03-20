# Role-Based Access Control Job Portal

A full-stack web application that enables organizations to manage job postings and candidate applications through a secure admin workflow, while providing applicants with a seamless job discovery and application experience.

This system includes separate admin and user interfaces, resume submission support, OTP verification during application, and a modular backend API architecture.

--------------------------------------------------

## Tech Stack

Frontend
- React (Vite)
- React Router
- Modular CSS styling

Backend
- Python
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Redis
- Twilio (OTP verification)
- JWT Authentication

DevOps
- Docker
- Docker Compose

--------------------------------------------------

## Key Features

- Public career landing page
- View open job listings
- Apply to jobs with resume upload
- OTP verification during application process
- Secure admin login system
- Protected admin dashboard
- Admin can create, update and delete job postings
- Admin can view applicants per job
- Modular REST API backend structure

--------------------------------------------------

## Project Structure

backend/
 - main application entry
 - authentication routes
 - job management APIs
 - applicant routes
 - OTP verification service
 - database models and schemas

frontend/
 - career landing page
 - job listing pages
 - job application workflow
 - admin dashboard
 - API service layer

--------------------------------------------------

## Local Development Setup

Clone repository

git clone <your-repository-link>
cd <project-folder>

Backend setup

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:
http://127.0.0.1:8000

API Documentation:
http://127.0.0.1:8000/docs

Frontend setup

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

--------------------------------------------------

## Docker Setup

Run full stack using Docker

docker compose up --build

--------------------------------------------------

## Environment Variables

Create a .env file inside backend folder and configure:

- Database connection URL
- JWT secret key
- Token expiry configuration
- Twilio account credentials
- Redis connection settings

Never commit environment or secret credential files.

--------------------------------------------------

## Application Routes

User Side
/ → Career landing page
/careers/jobs → Job listings
/apply/:jobId → Job application form

Admin Side
/admin/login → Admin login
/admin/dashboard → Dashboard overview
/admin/jobs → Manage job postings
/admin/applications → View job applicants

--------------------------------------------------

## Security

- Admin routes protected using JWT authentication
- OTP verification enforced before application submission
- Sensitive configuration handled through environment variables

--------------------------------------------------

## Future Enhancements which can be done in version 2

- Advanced role-based permission levels
- Application status tracking workflow
- Email notification integration
- Hiring analytics dashboard
- CI/CD deployment pipeline
