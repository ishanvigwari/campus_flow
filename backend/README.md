# 🎓 Campus Flow - Backend

Spring Boot REST API for Campus Flow Student Placement Management System.

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** + JWT Authentication
- **Spring Data JPA** with Hibernate
- **PostgreSQL** Database
- **Maven** Build Tool
- **Lombok** for boilerplate reduction
- **Google OAuth 2.0** integration

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/eduplacement/
│   │   │   ├── config/              # Configuration classes
│   │   │   │   ├── DataInitializer.java      # Demo data loader
│   │   │   │   └── SecurityConfig.java       # Security configuration
│   │   │   ├── controller/          # REST API endpoints
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── entity/              # JPA Entities
│   │   │   ├── exception/           # Exception handlers
│   │   │   ├── repository/          # Data repositories
│   │   │   ├── security/            # JWT & OAuth security
│   │   │   └── service/             # Business logic
│   │   └── resources/
│   │       ├── application.properties    # Main configuration
│   │       └── schema.sql                # Database schema reference
│   └── test/                        # Unit and integration tests
├── .env.example                     # Environment variables template
├── .gitignore
├── pom.xml                          # Maven dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/campus_flow.git
cd campus_flow/backend
```

### 2. Set Up PostgreSQL

See [DATABASE_SETUP.md](../DATABASE_SETUP.md) for detailed instructions.

Quick setup:
```bash
# Create database
psql -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

### 3. Configure Environment

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=your_secure_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
DEMO_DATA_ENABLED=true
```

### 4. Build and Run

```bash
# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will start at `http://localhost:8080`

### 5. Verify Installation

Check the health endpoint:
```bash
curl http://localhost:8080/api/health
```

## 🔑 Demo Credentials

When demo data is enabled (default), use these credentials:

**Admin Account:**
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Student Account:**
- Email: `emma@eduplacement.edu`
- Password: `student123`

⚠️ **Change these credentials in production!**

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@eduplacement.edu",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "admin@eduplacement.edu",
  "name": "Alex Johnson",
  "role": "ADMIN"
}
```

#### Google OAuth Login
```http
POST /auth/google
Content-Type: application/json

{
  "token": "google_id_token_here"
}
```

### Student Endpoints

```http
GET    /students              # Get all students (Admin)
GET    /students/{id}         # Get student by ID
POST   /students              # Create student
PUT    /students/{id}         # Update student
DELETE /students/{id}         # Delete student (Admin)
```

### Company Endpoints

```http
GET    /companies             # Get all companies
GET    /companies/{id}        # Get company by ID
POST   /companies             # Create company (Admin)
PUT    /companies/{id}        # Update company (Admin)
DELETE /companies/{id}        # Delete company (Admin)
```

### Drive Endpoints

```http
GET    /drives                # Get all drives
GET    /drives/active         # Get active drives
GET    /drives/{id}           # Get drive by ID
POST   /drives                # Create drive (Admin)
PUT    /drives/{id}           # Update drive (Admin)
DELETE /drives/{id}           # Delete drive (Admin)
```

### Application Endpoints

```http
GET    /applications/student/{studentId}    # Get student applications
POST   /applications                        # Apply to drive
PUT    /applications/{id}/status            # Update status (Admin)
DELETE /applications/{id}                   # Cancel application
```

### Interview Endpoints

```http
GET    /interviews/student/{studentId}      # Get student interviews
POST   /interviews                          # Schedule interview (Admin)
PUT    /interviews/{id}                     # Update interview (Admin)
DELETE /interviews/{id}                     # Cancel interview (Admin)
```

### Training Endpoints

```http
GET    /trainings                           # Get all trainings
GET    /trainings/{id}                      # Get training by ID
POST   /trainings                           # Create training (Admin)
POST   /trainings/{id}/enroll               # Enroll in training
DELETE /trainings/{id}/unenroll             # Unenroll from training
```

### Project Endpoints

```http
GET    /projects/student/{studentId}        # Get student projects
POST   /projects                            # Create project
PUT    /projects/{id}                       # Update project
DELETE /projects/{id}                       # Delete project
```

### Dashboard Endpoints

```http
GET    /dashboard/admin                     # Admin dashboard stats
GET    /dashboard/student/{studentId}       # Student dashboard stats
```

## 🔒 Security

### JWT Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Role-Based Access Control

- **ADMIN**: Full access to all endpoints
- **STUDENT**: Limited access to own data

### CORS Configuration

Configure allowed origins in `.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🗄️ Database Configuration

### Environment Variables

All database settings are configurable via environment variables:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DB_POOL_SIZE=10
DB_MIN_IDLE=5
```

### Schema Management

Configure JPA DDL auto mode:

- **`update`** (default): Safe for development, updates schema automatically
- **`validate`**: Production mode, validates schema only
- **`create`**: Recreates schema (data loss!)
- **`none`**: No schema management

### Demo Data

Control demo data loading:

```env
DEMO_DATA_ENABLED=true  # Load demo data on first run
DEMO_DATA_ENABLED=false # Skip demo data (production)
```

## 🧪 Testing

Run tests:
```bash
mvn test
```

Run specific test:
```bash
mvn test -Dtest=YourTestClass
```

## 📦 Building for Production

### Create executable JAR

```bash
mvn clean package -DskipTests
```

The JAR will be in `target/eduplacement-pro-backend-1.0.0.jar`

### Run the JAR

```bash
java -jar target/eduplacement-pro-backend-1.0.0.jar
```

### Production Configuration

Create a production `.env` file:

```env
# Database
DATABASE_URL=jdbc:postgresql://your-prod-db:5432/eduplacement_pro
DATABASE_USERNAME=prod_user
DATABASE_PASSWORD=strong_production_password

# Security
JWT_SECRET=very_strong_256_bit_secret_key_for_production
JWT_EXPIRATION=86400000

# Disable demo data
DEMO_DATA_ENABLED=false

# JPA Configuration
JPA_DDL_AUTO=validate
JPA_SHOW_SQL=false

# Logging
LOG_LEVEL_ROOT=WARN
LOG_LEVEL_APP=INFO
```

## 🐛 Troubleshooting

### Database Connection Issues

```
Error: Connection refused
```
- Ensure PostgreSQL is running
- Check DATABASE_URL, USERNAME, and PASSWORD in `.env`
- Verify database exists: `psql -U postgres -l`

### Port Already in Use

```
Error: Port 8080 is already in use
```
- Change port in `.env`: `SERVER_PORT=8081`
- Or kill the process using port 8080

### JWT Secret Error

```
Error: JWT secret key must be at least 256 bits
```
- Generate a secure secret: `openssl rand -base64 32`
- Update `JWT_SECRET` in `.env`

### Hibernate Schema Validation Failed

```
Error: Schema-validation: wrong column type
```
- Set `JPA_DDL_AUTO=update` in `.env`
- Or drop and recreate the database

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:8080/actuator/health
```

### Application Metrics

Enable Spring Boot Actuator endpoints in `application.properties`

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](../LICENSE) file.

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact: your.email@example.com

---

**Made with ❤️ by Campus Flow Team**
