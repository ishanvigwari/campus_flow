# Quick Start Guide - EduPlacement Pro Backend

## Option 1: Run with PostgreSQL (Production Setup)

### Step 1: Install PostgreSQL

**Download PostgreSQL:**
- Visit: https://www.postgresql.org/download/windows/
- Download PostgreSQL 16 (or latest version)
- Run the installer
- Set password for postgres user (remember this!)
- Default port: 5432

**After Installation:**
1. Open PowerShell as Administrator
2. Create the database:

```powershell
# Connect to PostgreSQL
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres

# Create database (type in psql prompt)
CREATE DATABASE eduplacement_pro;

# Exit psql
\q
```

### Step 2: Configure Application

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

### Step 3: Run Application

```powershell
.\mvnw.cmd spring-boot:run
```

---

## Option 2: Run with H2 Database (Quick Testing - No PostgreSQL needed)

### Step 1: Add H2 Dependency

Add to `pom.xml` (in `<dependencies>` section):

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Step 2: Create H2 Configuration

Create file: `src/main/resources/application-h2.properties`

```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:eduplacement_pro
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console (optional)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# JWT Configuration
jwt.secret=your_jwt_secret_key_change_this_in_production_make_it_at_least_256_bits_long
jwt.expiration=604800000

# Google OAuth
google.client.id=your_google_client_id_here.apps.googleusercontent.com

# CORS
cors.allowed-origins=http://localhost:5173

# Logging
logging.level.com.eduplacement=DEBUG
```

### Step 3: Run with H2 Profile

```powershell
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=h2
```

**H2 Console Access:**
- URL: http://localhost:8080/api/h2-console
- JDBC URL: `jdbc:h2:mem:eduplacement_pro`
- Username: `sa`
- Password: (leave empty)

---

## Verify Application is Running

### Check Health Endpoint

```powershell
curl http://localhost:8080/api/auth/health
```

Expected response:
```json
{
  "status": "UP",
  "service": "EduPlacement Pro API"
}
```

### Test Login

```powershell
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@eduplacement.edu\",\"password\":\"admin123\"}'
```

You should receive a JWT token in the response!

---

## Demo Credentials

### Admin
- **Email**: `admin@eduplacement.edu`
- **Password**: `admin123`

### Students
- **Email**: `emma@eduplacement.edu` (or marcus, sophia, liam, aisha)
- **Password**: `student123`

---

## Common Issues

### Issue: Port 8080 already in use
**Solution**: Change port in application.properties
```properties
server.port=8081
```

### Issue: Maven command not found
**Solution**: Use Maven wrapper
```powershell
.\mvnw.cmd clean install
```

### Issue: Java version error
**Solution**: Ensure Java 17+ is installed
```powershell
java -version
```

---

## Next Steps

1. ✅ **Backend is running** on http://localhost:8080/api
2. 🎯 **Start the frontend** (see frontend/README.md)
3. 📝 **Update frontend API URL** in frontend/.env:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```
4. 🚀 **Test the full application!**

---

## Stopping the Application

Press `Ctrl + C` in the terminal where the application is running.

---

## Production Checklist

Before deploying to production:

- [ ] Use PostgreSQL (not H2)
- [ ] Change JWT secret to a secure 256-bit key
- [ ] Update database credentials
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up environment variables
- [ ] Enable production logging
- [ ] Add rate limiting
- [ ] Review security configurations
