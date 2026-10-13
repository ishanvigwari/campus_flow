# Campus Flow - Role-Based Access & Features Documentation

## ?? Table of Contents
1. [Overview](#overview)
2. [User Roles](#user-roles)
3. [Authentication & Authorization](#authentication--authorization)
4. [Admin Features](#admin-features)
5. [Student Features](#student-features)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Security Features](#security-features)

---

## ?? Overview

Campus Flow is a comprehensive placement management system with role-based access control (RBAC) that provides different features and permissions based on user roles.

### System Architecture
- **Frontend**: React + Vite (Port: 5173)
- **Backend**: Spring Boot 3.2.0 (Port: 8080)
- **Database**: MySQL 8.0 (Database: eduplacement_pro)
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Spring Security with role-based access

---

## ?? User Roles

### 1. ADMIN Role
**Purpose**: Full system control and management
**Access Level**: Complete access to all features
**Capabilities**: Create, Read, Update, Delete (CRUD) operations on all entities

### 2. STUDENT Role
**Purpose**: Self-service portal for students
**Access Level**: Limited to own data and read-only views
**Capabilities**: View drives, apply to jobs, manage own profile

---

## ?? Authentication & Authorization

### Authentication Flow
1. User submits email and password
2. Backend validates credentials against database
3. System generates JWT token (7-day expiration)
4. Token contains: userId, email, role
5. Frontend stores token in localStorage
6. All subsequent requests include token in Authorization header

### JWT Token Structure
```json
{
  "userId": 1,
  "email": "admin@eduplacement.edu",
  "role": "ADMIN",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Authorization Levels
- **Public Endpoints**: /auth/login, /auth/register
- **Authenticated Endpoints**: Require valid JWT token
- **Admin-Only Endpoints**: Require ADMIN role
- **Student Endpoints**: Require STUDENT role

---

## ????? Admin Features

### 1. Dashboard
**Endpoint**: `/admin`
**Access**: ADMIN only

#### Features:
- ? View total students count
- ? View active placement drives
- ? Track pending applications
- ? Monitor interview schedules
- ? View placement statistics
- ? Real-time data updates
- ? Graphical analytics

#### API Calls:
- `GET /api/dashboard/admin` - Admin statistics

---

### 2. Student Management
**Endpoint**: `/admin/students`
**Access**: ADMIN only

#### Features:
- ? View all students
- ? Search students by name, email, batch
- ? Filter by status (Active, Placed, Graduated)
- ? Add new students
- ? Edit student profiles
- ? Delete student records
- ? View student placement history
- ? Export student data
- ? Bulk import students

#### Permissions:
- **GET** `/api/students` - View all students ?
- **GET** `/api/students/{id}` - View student details ?
- **POST** `/api/students` - Create student ? (Admin only)
- **PUT** `/api/students/{id}` - Update student ? (Admin only)
- **DELETE** `/api/students/{id}` - Delete student ? (Admin only)
- **GET** `/api/students/search?keyword={keyword}` - Search students ?
- **GET** `/api/students/status/{status}` - Filter by status ?
- **GET** `/api/students/batch/{batch}` - Filter by batch ?

---

### 3. Company & Drive Management
**Endpoint**: `/admin/drives`
**Access**: ADMIN only

#### Features:
- ? View all companies
- ? Add new companies
- ? Edit company details
- ? Delete companies
- ? Create placement drives
- ? Set eligibility criteria
- ? Manage drive status (Active, Completed, Cancelled)
- ? View drive applications
- ? Track hiring pipeline

#### Company Operations:
- **GET** `/api/companies` - View all companies ?
- **POST** `/api/companies` - Add company ? (Admin only)
- **PUT** `/api/companies/{id}` - Update company ? (Admin only)
- **DELETE** `/api/companies/{id}` - Delete company ? (Admin only)

#### Drive Operations:
- **GET** `/api/drives` - View all drives ?
- **GET** `/api/drives/active` - View active drives ?
- **POST** `/api/drives` - Create drive ? (Admin only)
- **PUT** `/api/drives/{id}` - Update drive ? (Admin only)
- **DELETE** `/api/drives/{id}` - Delete drive ? (Admin only)
- **GET** `/api/drives/status/{status}` - Filter by status ?

---

### 4. Application Management
**Endpoint**: `/admin/applications`
**Access**: ADMIN only

#### Features:
- ? View all applications
- ? Filter by status (Pending, Approved, Rejected, Shortlisted)
- ? Update application status
- ? View student-drive mapping
- ? Track application timeline
- ? Generate application reports
- ? Bulk status updates

#### Permissions:
- **GET** `/api/applications` - View all applications ?
- **GET** `/api/applications/drive/{driveId}` - Applications by drive ?
- **PUT** `/api/applications/{id}` - Update status ? (Admin only)
- **DELETE** `/api/applications/{id}` - Delete application ? (Admin only)

---

### 5. Interview Management
**Endpoint**: `/admin` (integrated view)
**Access**: ADMIN only

#### Features:
- ? Schedule interviews
- ? Assign interviewers
- ? Set interview rounds
- ? Track interview results
- ? Manage interview feedback
- ? Calendar view of interviews
- ? Email notifications

#### Permissions:
- **GET** `/api/interviews` - View all interviews ?
- **GET** `/api/interviews/upcoming` - Upcoming interviews ?
- **POST** `/api/interviews` - Schedule interview ? (Admin only)
- **PUT** `/api/interviews/{id}` - Update interview ? (Admin only)
- **DELETE** `/api/interviews/{id}` - Cancel interview ? (Admin only)

---

### 6. Project Tracking
**Endpoint**: `/admin/projects`
**Access**: ADMIN only

#### Features:
- ? View all student projects
- ? Track project progress
- ? Assign project mentors
- ? Set project deadlines
- ? Review project submissions
- ? Grade projects
- ? Export project reports

#### Permissions:
- **GET** `/api/projects` - View all projects ?
- **GET** `/api/projects/student/{studentId}` - Projects by student ?
- **POST** `/api/projects` - Create project ? (Admin/Student)
- **PUT** `/api/projects/{id}` - Update project ? (Admin/Student)
- **DELETE** `/api/projects/{id}` - Delete project ? (Admin only)

---

### 7. Training Programs
**Endpoint**: `/admin` (integrated view)
**Access**: ADMIN only

#### Features:
- ? Create training programs
- ? Set training schedules
- ? Manage enrollments
- ? Track attendance
- ? Monitor progress
- ? Issue certificates
- ? Training analytics

#### Permissions:
- **GET** `/api/trainings` - View all trainings ?
- **POST** `/api/trainings` - Create training ? (Admin only)
- **PUT** `/api/trainings/{id}` - Update training ? (Admin only)
- **DELETE** `/api/trainings/{id}` - Delete training ? (Admin only)
- **POST** `/api/trainings/{id}/enroll` - Enroll student ?
- **DELETE** `/api/trainings/{id}/unenroll` - Remove enrollment ?

---

### 8. Reports & Analytics
**Endpoint**: `/admin/reports`
**Access**: ADMIN only

#### Features:
- ? Placement statistics
- ? Company-wise analysis
- ? Batch-wise performance
- ? Trend analysis
- ? Export to PDF/Excel
- ? Custom date ranges
- ? Graphical representations

---

## ????? Student Features

### 1. Student Dashboard
**Endpoint**: `/student`
**Access**: STUDENT only

#### Features:
- ? View personal statistics
- ? Application status summary
- ? Upcoming interviews
- ? Active drives count
- ? Training enrollments
- ? Quick actions panel

#### API Calls:
- `GET /api/dashboard/student/{studentId}` - Student statistics ?

---

### 2. Profile Management
**Endpoint**: `/student/profile`
**Access**: STUDENT only (own profile)

#### Features:
- ? View profile details
- ? Edit personal information
- ? Update resume
- ? Add skills
- ? Update academic details
- ? Upload profile picture
- ? Manage contact information

#### Permissions:
- **GET** `/api/students/user/{userId}` - View own profile ?
- **PUT** `/api/students/{id}` - Update own profile ? (Limited fields)

---

### 3. Browse Drives
**Endpoint**: `/student` (integrated)
**Access**: STUDENT only

#### Features:
- ? View active placement drives
- ? Search drives by company
- ? Filter by eligibility
- ? View drive details
- ? Check application status
- ? Apply to drives
- ? Withdraw applications

#### Permissions:
- **GET** `/api/drives` - View drives ? (Read-only)
- **GET** `/api/drives/active` - View active drives ?
- **POST** `/api/applications` - Apply to drive ? (Student)
- **GET** `/api/applications/student/{studentId}` - View own applications ?

---

### 4. Application Tracking
**Endpoint**: `/student` (integrated)
**Access**: STUDENT only

#### Features:
- ? View application history
- ? Track application status
- ? View rejection reasons
- ? Check shortlist status
- ? Timeline view
- ? Notifications

---

### 5. Interview Schedule
**Endpoint**: `/student` (integrated)
**Access**: STUDENT only

#### Features:
- ? View scheduled interviews
- ? Interview details (date, time, location)
- ? Interview rounds
- ? Preparation resources
- ? Calendar integration
- ? Reminders

#### Permissions:
- **GET** `/api/interviews/student/{studentId}` - View own interviews ?

---

### 6. Project Submission
**Endpoint**: `/student` (integrated)
**Access**: STUDENT only

#### Features:
- ? Create project entries
- ? Upload project files
- ? Add project links (GitHub, Demo)
- ? Update project status
- ? Track mentor feedback
- ? View grades

#### Permissions:
- **GET** `/api/projects/student/{studentId}` - View own projects ?
- **POST** `/api/projects` - Create project ? (Student)
- **PUT** `/api/projects/{id}` - Update own project ? (Student)

---

### 7. Training Enrollment
**Endpoint**: `/student` (integrated)
**Access**: STUDENT only

#### Features:
- ? Browse available trainings
- ? Enroll in programs
- ? Track progress
- ? View certificates
- ? Training materials
- ? Attendance records

#### Permissions:
- **GET** `/api/trainings` - View trainings ? (Read-only)
- **POST** `/api/trainings/{id}/enroll?studentId={id}` - Enroll ?

---

## ?? API Endpoints Summary

### Public Endpoints (No Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/google` | Google OAuth login |
| GET | `/api/health` | Health check |

---

### Admin-Only Endpoints (Require ADMIN role)
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/api/students` | Create student | ? |
| PUT | `/api/students/{id}` | Update student | ? |
| DELETE | `/api/students/{id}` | Delete student | ? |
| POST | `/api/companies` | Create company | ? |
| PUT | `/api/companies/{id}` | Update company | ? |
| DELETE | `/api/companies/{id}` | Delete company | ? |
| POST | `/api/drives` | Create drive | ? |
| PUT | `/api/drives/{id}` | Update drive | ? |
| DELETE | `/api/drives/{id}` | Delete drive | ? |
| POST | `/api/trainings` | Create training | ? |
| PUT | `/api/trainings/{id}` | Update training | ? |
| DELETE | `/api/trainings/{id}` | Delete training | ? |
| GET | `/api/dashboard/admin` | Admin dashboard | ? |

---

### Authenticated Endpoints (Require valid JWT)
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/api/students` | Get all students | ? |
| GET | `/api/students/{id}` | Get student by ID | ? |
| GET | `/api/companies` | Get all companies | ? |
| GET | `/api/drives` | Get all drives | ? |
| GET | `/api/applications` | Get all applications | ? |
| GET | `/api/projects` | Get all projects | ? |
| GET | `/api/trainings` | Get all trainings | ? |
| POST | `/api/applications` | Apply to drive | ? |
| POST | `/api/projects` | Create project | ? |

---

## ?? Database Schema

### Tables (9 Total)

#### 1. **users** - User authentication
- `id` (Primary Key)
- `email` (Unique)
- `password` (Encrypted)
- `role` (ADMIN/STUDENT)
- `name`
- `profile_picture`
- `created_at`
- `updated_at`

#### 2. **students** - Student profiles
- `id` (Primary Key)
- `user_id` (Foreign Key ? users)
- `roll_number` (Unique)
- `batch`
- `department`
- `cgpa`
- `phone`
- `resume_url`
- `skills`
- `status` (Active/Placed/Graduated)
- `created_at`
- `updated_at`

#### 3. **companies** - Company information
- `id` (Primary Key)
- `name`
- `industry`
- `website`
- `logo_url`
- `description`
- `is_active`
- `created_at`

#### 4. **drives** - Placement drives
- `id` (Primary Key)
- `company_id` (Foreign Key ? companies)
- `title`
- `description`
- `eligibility_criteria`
- `package_offered`
- `job_location`
- `deadline`
- `status` (Active/Completed/Cancelled)
- `created_at`

#### 5. **applications** - Student applications
- `id` (Primary Key)
- `student_id` (Foreign Key ? students)
- `drive_id` (Foreign Key ? drives)
- `status` (Pending/Approved/Rejected/Shortlisted)
- `applied_at`
- `updated_at`

#### 6. **interviews** - Interview schedules
- `id` (Primary Key)
- `application_id` (Foreign Key ? applications)
- `interview_date`
- `interview_time`
- `location`
- `round`
- `status`
- `feedback`

#### 7. **projects** - Student projects
- `id` (Primary Key)
- `student_id` (Foreign Key ? students)
- `title`
- `description`
- `tech_stack`
- `github_url`
- `demo_url`
- `status`
- `grade`

#### 8. **trainings** - Training programs
- `id` (Primary Key)
- `title`
- `description`
- `start_date`
- `end_date`
- `instructor`
- `max_participants`
- `status`

#### 9. **training_enrollment** - Training enrollments
- `id` (Primary Key)
- `training_id` (Foreign Key ? trainings)
- `student_id` (Foreign Key ? students)
- `enrolled_at`
- `completion_status`

---

## ?? Security Features

### 1. Password Encryption
- Uses BCrypt with salt rounds
- Passwords never stored in plain text
- One-way hashing algorithm

### 2. JWT Authentication
- Stateless authentication
- Token expiration: 7 days
- Signed with secret key (256-bit minimum)
- Token validation on every request

### 3. Role-Based Authorization
- Spring Security integration
- Method-level security (`@PreAuthorize`)
- URL-based security rules
- Automatic role validation

### 4. CORS Configuration
- Configured allowed origins
- Credentials support enabled
- Specific methods allowed
- Header restrictions

### 5. SQL Injection Protection
- JPA/Hibernate parameterized queries
- No raw SQL execution
- Input validation

### 6. Session Management
- Stateless session policy
- No server-side sessions
- JWT-only authentication

---

## ?? Getting Started

### Test Credentials

#### Admin Account
```
Email: admin@eduplacement.edu
Password: admin123
Access: Full system control
```

#### Student Account
```
Email: emma@eduplacement.edu
Password: student123
Access: Student portal only
```

### Access URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:3306/eduplacement_pro

---

## ?? API Request Examples

### Login (Admin)
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eduplacement.edu","password":"admin123"}'
```

### Get All Students (Admin)
```bash
curl -X GET http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Apply to Drive (Student)
```bash
curl -X POST http://localhost:8080/api/applications \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"studentId":2,"driveId":1}'
```

---

## ?? Feature Status Summary

### ? Fully Working
- Authentication & Login
- Student Management (CRUD)
- Company Management
- Application Tracking
- Project Management
- Training Programs
- Dashboard Statistics
- Role-Based Access Control
- JWT Token Generation

### ?? Tested & Verified
- All CRUD operations
- Search & Filter functionality
- Authorization checks
- Database connections
- API response formats

---

## ?? Support

For issues or questions:
1. Check backend logs in terminal
2. Check frontend console (F12)
3. Verify database connection
4. Ensure all services are running

---

**Last Updated**: October 2026
**Version**: 1.0.0
**Database**: MySQL 8.0
**Framework**: Spring Boot 3.2.0 + React

