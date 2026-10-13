# EduPlacement Pro Backend

Spring Boot backend API for EduPlacement Pro - Student Placement Management System

## Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **Authentication**: Google OAuth 2.0
- **Build Tool**: Maven

## Prerequisites

1. **Java 17 or higher**
   ```bash
   java -version
   ```

2. **Maven** (or use Maven Wrapper included)
   ```bash
   mvn -version
   ```

3. **PostgreSQL** (version 12 or higher)
   - Install PostgreSQL from: https://www.postgresql.org/download/
   - Create a database named `eduplacement_pro`

## Database Setup

### Windows

1. Open PowerShell as Administrator
2. Create database:
   ```powershell
   psql -U postgres
   CREATE DATABASE eduplacement_pro;
   \q
   ```

### Alternative: PgAdmin GUI

1. Open PgAdmin
2. Right-click on "Databases" → "Create" → "Database"
3. Name: `eduplacement_pro`
4. Click "Save"

## Configuration

1. Open `src/main/resources/application.properties`
2. Update database credentials:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_postgres_password
   ```

3. Update JWT secret (make it at least 256 bits):
   ```properties
   jwt.secret=your_secure_jwt_secret_key_here
   ```

4. (Optional) Add Google OAuth Client ID:
   ```properties
   google.client.id=your_google_client_id_here.apps.googleusercontent.com
   ```

## Running the Application

### Option 1: Using Maven Wrapper (Recommended)

Windows:
```powershell
.\mvnw.cmd spring-boot:run
```

Linux/Mac:
```bash
./mvnw spring-boot:run
```

### Option 2: Using Maven

```bash
mvn spring-boot:run
```

### Option 3: Using IDE

1. Open the project in IntelliJ IDEA / Eclipse / VS Code
2. Run `EduPlacementProApplication.java`

## Verify Application

The application will start on **http://localhost:8080/api**

Check health endpoint:
```bash
curl http://localhost:8080/api/auth/health
```

Expected response:
```json
{
  "status": "UP",
  "service": "EduPlacement Pro API"
}
```

## Demo Credentials

The application automatically seeds demo data on first run.

### Admin Login
- **Email**: `admin@eduplacement.edu`
- **Password**: `admin123`

### Student Login
- **Email**: `emma@eduplacement.edu`
- **Password**: `student123`

Other student emails:
- `marcus@eduplacement.edu`
- `sophia@eduplacement.edu`
- `liam@eduplacement.edu`
- `aisha@eduplacement.edu`

All student passwords: `student123`

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Login with Email/Password
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@eduplacement.edu",
  "password": "admin123"
}
```

#### Google OAuth Login
```bash
POST /auth/google-login
Content-Type: application/json

{
  "idToken": "google_id_token_here",
  "role": "admin"
}
```

### Protected Endpoints (Requires JWT Token)

Add JWT token to request header:
```
Authorization: Bearer your_jwt_token_here
```

#### Students
- `GET /students` - Get all students (Admin only)
- `GET /students/{id}` - Get student by ID
- `GET /students/user/{userId}` - Get student by user ID
- `POST /students` - Create student (Admin only)
- `PUT /students/{id}` - Update student
- `DELETE /students/{id}` - Delete student (Admin only)

#### Projects
- `GET /projects` - Get all projects
- `GET /projects/{id}` - Get project by ID
- `GET /projects/student/{studentId}` - Get student's projects
- `POST /projects` - Create project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project (Admin only)

#### Companies
- `GET /companies` - Get all companies
- `GET /companies/{id}` - Get company by ID
- `POST /companies` - Create company (Admin only)
- `PUT /companies/{id}` - Update company (Admin only)
- `DELETE /companies/{id}` - Delete company (Admin only)

#### Drives (Placement Drives)
- `GET /drives` - Get all drives
- `GET /drives/{id}` - Get drive by ID
- `GET /drives/active` - Get active drives
- `POST /drives` - Create drive (Admin only)
- `PUT /drives/{id}` - Update drive (Admin only)
- `DELETE /drives/{id}` - Delete drive (Admin only)

#### Applications
- `GET /applications` - Get all applications (Admin only)
- `GET /applications/{id}` - Get application by ID
- `GET /applications/student/{studentId}` - Get student's applications
- `POST /applications` - Create application
- `PUT /applications/{id}` - Update application
- `DELETE /applications/{id}` - Delete application (Admin only)

#### Interviews
- `GET /interviews` - Get all interviews (Admin only)
- `GET /interviews/{id}` - Get interview by ID
- `GET /interviews/student/{studentId}` - Get student's interviews
- `POST /interviews` - Create interview (Admin only)
- `PUT /interviews/{id}` - Update interview (Admin only)
- `DELETE /interviews/{id}` - Delete interview (Admin only)

#### Trainings
- `GET /trainings` - Get all trainings
- `GET /trainings/{id}` - Get training by ID
- `GET /trainings/upcoming` - Get upcoming trainings
- `POST /trainings` - Create training (Admin only)
- `PUT /trainings/{id}` - Update training (Admin only)
- `DELETE /trainings/{id}` - Delete training (Admin only)

#### Dashboard
- `GET /dashboard/admin` - Get admin dashboard statistics (Admin only)
- `GET /dashboard/student` - Get student dashboard (Student only)

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@eduplacement.edu\",\"password\":\"admin123\"}"
```

### Get Students Example (with JWT)
```bash
curl -X GET http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Common Issues & Solutions

### Issue 1: Database Connection Failed
**Error**: `Connection to localhost:5432 refused`

**Solution**:
- Ensure PostgreSQL is running
- Check if port 5432 is available
- Verify credentials in `application.properties`

```bash
# Check PostgreSQL status (Windows)
Get-Service postgresql*

# Start PostgreSQL (Windows)
Start-Service postgresql-x64-[version]
```

### Issue 2: Port 8080 Already in Use
**Error**: `Port 8080 is already in use`

**Solution**: Change port in `application.properties`
```properties
server.port=8081
```

### Issue 3: Maven Wrapper Not Working
**Solution**: Install Maven globally or use IDE's built-in Maven

### Issue 4: Database Not Created
**Solution**: Manually create database
```sql
CREATE DATABASE eduplacement_pro;
```

### Issue 5: JWT Token Expired
**Solution**: Login again to get a new token. Tokens expire after 7 days by default.

## Development Profile

For development with auto-restart and detailed logging:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

This enables:
- SQL query logging
- Debug level logging
- Database recreation on each start

## Build for Production

```bash
mvn clean package -DskipTests
```

Run the JAR:
```bash
java -jar target/eduplacement-pro-backend-1.0.0.jar
```

## Project Structure

```
backend/
├── src/main/java/com/eduplacement/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA entities
│   ├── exception/      # Custom exceptions
│   ├── repository/     # JPA repositories
│   ├── security/       # Security configuration
│   └── service/        # Business logic
├── src/main/resources/
│   ├── application.properties      # Main configuration
│   └── application-dev.properties  # Dev configuration
└── pom.xml            # Maven dependencies
```

## Security Notes

⚠️ **Important for Production**:

1. **Change default passwords** - Demo credentials are for development only
2. **Update JWT secret** - Use a secure, random 256-bit key
3. **Enable HTTPS** - Never send tokens over HTTP in production
4. **Implement rate limiting** - Protect against brute force attacks
5. **Add input validation** - Validate all user inputs
6. **Use environment variables** - Don't commit secrets to version control
7. **Enable CORS properly** - Restrict allowed origins in production

## Frontend Integration

Update frontend `.env` file:
```env
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

## Support

For issues or questions:
1. Check the logs in `logs/` directory
2. Review PostgreSQL logs
3. Check Spring Boot actuator endpoints (if enabled)

## License

MIT License - See LICENSE file for details
