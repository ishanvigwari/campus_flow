@echo off
echo ==========================================
echo Starting Campus Flow Backend with MySQL
echo ==========================================
echo.

cd backend
echo Starting Spring Boot application...
echo Please wait, this may take 30-60 seconds...
echo.

set DATABASE_PASSWORD=P@ssw0rd
set DATABASE_USERNAME=root
set DATABASE_URL=jdbc:mysql://localhost:3306/eduplacement_pro?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true

mvn spring-boot:run

pause
