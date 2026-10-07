#  Campus Flow - Student Placement Management System

A comprehensive web-based platform for managing campus placements, training programs, and student career development.

##  Overview

Campus Flow is a full-stack application designed to streamline the placement process in educational institutions. It provides separate interfaces for administrators and students to manage placement drives, applications, interviews, training programs, and student projects.

##  Features

### For Administrators
- **Dashboard Analytics** - Real-time overview of placements, applications, and upcoming drives
- **Company Management** - Add and manage recruiting companies
- **Placement Drives** - Create and manage placement drives with eligibility criteria
- **Application Tracking** - Monitor student applications and their status
- **Interview Scheduling** - Schedule and manage interview rounds
- **Training Programs** - Create and manage training sessions for students
- **Student Management** - View and manage student profiles and achievements

### For Students
- **Personal Dashboard** - View applied drives, interview schedules, and training enrollments
- **Drive Applications** - Browse and apply for available placement drives
- **Interview Management** - Track interview schedules and feedback
- **Training Enrollment** - Enroll in training programs to enhance skills
- **Project Showcase** - Add and showcase academic/personal projects
- **Profile Management** - Maintain resume, skills, and academic information

##  Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT Authentication
- **OAuth**: Google OAuth 2.0 integration
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.3.1
- **Routing**: React Router DOM 7.0.2
- **Build Tool**: Vite 6.0.5
- **UI Icons**: Lucide React
- **OAuth**: @react-oauth/google

##  Project Structure

```
campus_flow/
├── backend/                  # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/eduplacement/
│   │       │   ├── config/           # Security & initialization configs
│   │       │   ├── controller/       # REST API controllers
│   │       │   ├── dto/              # Data Transfer Objects
│   │       │   ├── entity/           # JPA entities
│   │       │   ├── exception/        # Exception handlers
│   │       │   ├── repository/       # Data repositories
│   │       │   ├── security/         # JWT & OAuth security
│   │       │   └── service/          # Business logic services
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/                 # React frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Page components
    │   ├── lib/              # Utilities and helpers
    │   ├── main.jsx          # Application entry point
    │   └── styles.css        # Global styles
    ├── index.html
    ├── package.json
    ├── .env.example
    └── README.md
```

##  Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- PostgreSQL 12+
- Maven 3.8+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/campus_flow.git
   cd campus_flow/backend
   ```

2. **Configure Database**
   
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE eduplacement;
   ```

3. **Configure Application Properties**
   
   Create `backend/src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/eduplacement
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   
   # JWT Configuration
   jwt.secret=your-256-bit-secret-key-here
   jwt.expiration=86400000
   
   # Google OAuth
   google.client.id=your-google-client-id
   
   # Server Configuration
   server.port=8080
   ```

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will start at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Copy `.env.example` to `.env` and update:
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Frontend will start at `http://localhost:5173`

##  Authentication

The application supports two authentication methods:

1. **Google OAuth 2.0** - Quick sign-in with Google account
2. **JWT Token Authentication** - Secure token-based authentication

### Setting up Google OAuth

See [OAUTH_SETUP.md](frontend/OAUTH_SETUP.md) for detailed instructions on configuring Google OAuth.

##  API Documentation

### Base URL
```
http://localhost:8080/api
```

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/google` - Google OAuth login

#### Students
- `GET /students` - Get all students (Admin)
- `GET /students/{id}` - Get student by ID
- `POST /students` - Create student profile
- `PUT /students/{id}` - Update student profile

#### Companies
- `GET /companies` - Get all companies
- `POST /companies` - Create company (Admin)

#### Drives
- `GET /drives` - Get all placement drives
- `GET /drives/active` - Get active drives
- `POST /drives` - Create drive (Admin)

#### Applications
- `GET /applications/student/{studentId}` - Get student applications
- `POST /applications` - Apply to a drive
- `PUT /applications/{id}/status` - Update application status (Admin)

#### Interviews
- `GET /interviews/student/{studentId}` - Get student interviews
- `POST /interviews` - Schedule interview (Admin)

#### Training
- `GET /trainings` - Get all training programs
- `POST /trainings` - Create training (Admin)
- `POST /trainings/{id}/enroll` - Enroll in training

##  Default Admin Credentials

After first run, the system initializes with default admin account:

- **Email**: `admin@eduplacement.com`
- **Password**: `admin123`

 **Important**: Change the default password immediately after first login!

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


##  Acknowledgments

- Spring Boot for the robust backend framework
- React team for the excellent frontend library
- Google for OAuth integration
- All contributors who help improve this project

##  Contact

For questions or support, please contact: ishanvigwari@gmail.com

---


