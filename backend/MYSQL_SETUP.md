# MySQL Setup Guide for EduPlacement Pro

## Prerequisites
- MySQL 8.0+ installed and running on your system
- MySQL service must be running

## Step 1: Check MySQL Service Status
```powershell
Get-Service -Name "*mysql*"
```

## Step 2: Create Database

### Option A: Using MySQL Command Line (Recommended)
```powershell
# Login to MySQL (enter your root password when prompted)
mysql -u root -p

# Then run these SQL commands:
CREATE DATABASE IF NOT EXISTS eduplacement_pro 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

# Verify database was created
SHOW DATABASES LIKE 'eduplacement%';

# Exit MySQL
EXIT;
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL instance
3. Run the SQL script from `setup-mysql.sql`

## Step 3: Configure MySQL Password

Edit `backend/src/main/resources/application-mysql.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

Replace `YOUR_MYSQL_ROOT_PASSWORD` with your actual MySQL root password.

## Step 4: Run the Application with MySQL Profile

```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"
```

## Verify Everything Works

1. Backend should start without errors
2. Check logs for: `Tomcat started on port 8080`
3. Tables will be auto-created by Hibernate
4. Demo data will be inserted automatically on first run

## Database Connection Details

- **Host**: localhost
- **Port**: 3306
- **Database**: eduplacement_pro
- **Username**: root (or your custom user)
- **Password**: Set in application-mysql.properties

## Troubleshooting

### Error: Access denied for user 'root'@'localhost'
- Check your MySQL password in application-mysql.properties
- Reset MySQL root password if needed

### Error: Communications link failure
- Make sure MySQL service is running
- Verify port 3306 is not blocked by firewall

### Error: Unknown database 'eduplacement_pro'
- Make sure you ran the CREATE DATABASE command
- Check database exists: `SHOW DATABASES;`

## Switching Between H2 and MySQL

### Use H2 (file-based, lightweight):
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=h2"
```

### Use MySQL (production-grade):
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"
```

## Data Persistence

With MySQL:
- ✅ Data persists across restarts
- ✅ No size limits (grows as needed)
- ✅ Better performance for large datasets
- ✅ Production-ready
- ✅ Can connect external tools like MySQL Workbench

With H2:
- ⚠️ Limited to file-based storage
- ⚠️ Not recommended for production
- ✅ Good for development/testing
- ✅ No external dependencies
