# EduPlacement Pro

A comprehensive Student Placement Management System with React frontend and Spring Boot backend for managing students, projects, companies, placement drives, applications, interviews, and training programs.

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - [Download](https://adoptium.net/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL** (optional, H2 works for quick testing)

### 1. Start Backend (with H2 - No PostgreSQL needed)

```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=h2"
```

Backend runs at: **http://localhost:8080/api**

### 2. Start Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

### 3. Login with Demo Credentials

**Admin Portal**: http://localhost:5173/login/admin
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Student Portal**: http://localhost:5173/login/student
- Email: `emma@eduplacement.edu`
- Password: `student123`

## 📁 Project Structure

```
management_system/
├── backend/              # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/             # React + Vite application
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md            # This file
```

## ⚙️ Technology Stack

### Backend
- **Spring Boot 3.2.0** - REST API framework
- **Java 17** - Programming language
- **PostgreSQL / H2** - Database (H2 for quick testing)
- **Spring Security + JWT** - Authentication & authorization
- **Google OAuth 2.0** - Social login

### Frontend
- **React 18.3.1** - UI library
- **Vite 6.0.5** - Build tool
- **React Router 7.0.2** - Routing
- **Lucide React** - Icons
- **@react-oauth/google** - Google OAuth integration

## 🔐 Authentication

### Email/Password Login
Both admin and student portals support traditional email/password authentication with JWT tokens.

### Google OAuth (Optional)
To enable Google login:

1. Get Google Client ID from [Google Cloud Console](https://console.cloud.google.com/)
2. Configure frontend `.env`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   ```
3. Configure backend `application-h2.properties`:
   ```properties
   google.client.id=your_client_id.apps.googleusercontent.com
   ```

See [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) for detailed instructions.

## 🗄️ Database

### Quick Testing (H2 - In-Memory)
No setup required! Just run with `-Dspring-boot.run.profiles=h2`

**H2 Console**: http://localhost:8080/api/h2-console
- JDBC URL: `jdbc:h2:mem:eduplacement_pro`
- Username: `sa`
- Password: (empty)

### Production (PostgreSQL)
1. Install PostgreSQL
2. Create database: `eduplacement_pro`
3. Update `application.properties` with credentials
4. Run: `.\mvnw.cmd spring-boot:run`

## 📋 Core Features

### Admin Portal
- Dashboard with statistics and analytics
- Student management (CRUD operations)
- Project tracking and monitoring
- Company & placement drive management
- Application review and processing
- Interview scheduling
- Training program administration
- Reports and analytics

### Student Portal
- Personal dashboard with placement status
- Apply to placement drives
- Track application status
- View interview schedules
- Enroll in training programs
- Update profile and resume
- View placement statistics

### API Features
- RESTful API architecture
- JWT-based authentication
- Role-based access control (Admin/Student)
- Input validation and error handling
- CORS configuration
- Auto-seeded demo data

## 🔌 API Endpoints

**Base URL**: `http://localhost:8080/api`

### Public Endpoints
- `POST /auth/login` - Email/password login
- `POST /auth/google-login` - Google OAuth login
- `GET /auth/health` - Health check

### Protected Endpoints (Require JWT Token)
- `/students/*` - Student management
- `/projects/*` - Project tracking
- `/companies/*` - Company management
- `/drives/*` - Placement drives
- `/applications/*` - Job applications
- `/interviews/*` - Interview scheduling
- `/trainings/*` - Training programs
- `/dashboard/*` - Dashboard statistics

Full API documentation in [backend/README.md](backend/README.md)

## 📊 Demo Data

The application includes pre-populated demo data:
- 1 Admin user
- 5 Student users with profiles
- 5 Companies (TechCorp, InnovateSoft, DataDynamics, etc.)
- 3 Active placement drives
- Sample projects, applications, and interviews
- 3 Training programs

## 🛠️ Development

### Backend Development
```powershell
cd backend
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend Development
```powershell
cd frontend
npm run dev
```

### Build for Production
**Backend**:
```powershell
cd backend
mvn clean package -DskipTests
java -jar target/eduplacement-pro-backend-1.0.0.jar
```

**Frontend**:
```powershell
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Backend won't start
- Check if Java 17+ is installed: `java -version`
- Ensure port 8080 is available
- Verify database configuration (or use H2 profile)

### Frontend won't start
- Check if Node.js is installed: `node -v`
- Run `npm install` in frontend directory
- Ensure port 5173 is available

### Can't login
- Verify backend is running: `curl http://localhost:8080/api/auth/health`
- Check browser console for errors
- Try demo credentials listed above

### Port already in use
Change port in respective config:
- **Backend**: Edit `application.properties` → `server.port=8081`
- **Frontend**: Edit `vite.config.js` → `server: { port: 5174 }`

## 📖 Additional Documentation

- [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) - Google OAuth configuration guide
- [backend/README.md](backend/README.md) - Backend API documentation
- [frontend/README.md](frontend/README.md) - Frontend features and setup

## 🔒 Security Notes

⚠️ **For Production Deployment**:
- Change default passwords and JWT secret
- Enable HTTPS for all communications
- Configure proper CORS origins
- Use environment variables for secrets
- Implement rate limiting
- Set up database backups
- Enable security headers
- Review Spring Security configuration

## 📞 Support

### Check Application Status
```powershell
# Backend health
curl http://localhost:8080/api/auth/health

# Frontend (should open in browser)
start http://localhost:5173
```

### Common Commands
```powershell
# Clean and rebuild backend
cd backend
.\mvnw.cmd clean install

# Reinstall frontend dependencies
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## 🎯 Success Criteria

Your application is ready when:
- ✅ Backend health endpoint returns "UP"
- ✅ Can login with demo credentials
- ✅ Frontend loads without errors
- ✅ Can navigate between pages
- ✅ Dashboard displays statistics

## 📝 License

MIT License

## 🎉 Getting Help

1. Check documentation files
2. Review application logs
3. Inspect browser developer console
4. Verify configuration files
5. Test API endpoints with curl or Postman

---

**Built with Spring Boot & React** | **Ready for Campus Placements** 🚀
