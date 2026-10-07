# 🗄️ Database Setup Guide

This guide will help you set up PostgreSQL for Campus Flow.

## 📋 Prerequisites

- PostgreSQL 12 or higher installed
- pgAdmin (optional, for GUI management)

## 🚀 Quick Setup

### 1. Install PostgreSQL

#### Windows
Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

#### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database

#### Option A: Using psql (Command Line)

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE eduplacement_pro;

# Create user (optional, if you want a dedicated user)
CREATE USER eduplacement_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eduplacement_pro TO eduplacement_user;

# Exit psql
\q
```

#### Option B: Using pgAdmin (GUI)

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Enter database name: `eduplacement_pro`
5. Click "Save"

### 3. Configure Environment Variables

#### Backend Configuration

1. Navigate to `backend/` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and update:
   ```env
   DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_actual_password
   
   # Generate a secure JWT secret (32+ characters)
   JWT_SECRET=your_secure_jwt_secret_key_here
   
   # Enable demo data (set to false in production)
   DEMO_DATA_ENABLED=true
   ```

#### Generate Secure JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Using Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 4. Verify Connection

Test your database connection:

```bash
psql -U postgres -d eduplacement_pro -c "SELECT version();"
```

## 🎯 Running the Application

### 1. Start Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The application will:
- Connect to PostgreSQL
- Auto-create tables based on JPA entities
- Load demo data (if enabled)

### 2. Check Logs

Look for these messages in the console:

```
✓ HikariPool-1 - Start completed.
✓ Hibernate: create table if not exists users ...
✓ Demo data initialization completed successfully!
✓ DEMO CREDENTIALS:
  Admin: admin@eduplacement.edu / admin123
  Student: emma@eduplacement.edu / student123
```

## 📊 Demo Data

When `DEMO_DATA_ENABLED=true`, the system will automatically create:

### Users & Students
- **1 Admin User**: Full system access
- **5 Student Users**: Various placement statuses

### Companies
- 5 recruiting companies across different industries

### Placement Drives
- 3 active placement drives with different statuses

### Applications & Interviews
- Sample applications from students to drives
- Scheduled interviews for students

### Projects
- 3 student projects in various stages

### Training Programs
- 3 training programs (workshop, course, seminar)

## 🔧 Configuration Options

### JPA DDL Auto Modes

In `.env`, you can set `JPA_DDL_AUTO` to:

- **`update`** (default): Updates schema automatically, safe for development
- **`create`**: Drops and recreates tables on each restart (data loss!)
- **`create-drop`**: Creates on start, drops on shutdown
- **`validate`**: Only validates schema, no modifications
- **`none`**: No schema management

### Production Configuration

For production, update `.env`:

```env
# Disable demo data
DEMO_DATA_ENABLED=false

# Use validate or none for DDL auto
JPA_DDL_AUTO=validate

# Reduce logging
JPA_SHOW_SQL=false
LOG_LEVEL_APP=INFO
LOG_LEVEL_SQL=WARN

# Secure JWT secret (strong, unique)
JWT_SECRET=your_production_secret_minimum_256_bits

# Configure proper connection pool
DB_POOL_SIZE=20
DB_MIN_IDLE=10
```

## 🗑️ Reset Database

If you need to start fresh:

### Option 1: Drop and Recreate (Command Line)

```bash
psql -U postgres

DROP DATABASE eduplacement_pro;
CREATE DATABASE eduplacement_pro;
\q
```

### Option 2: Clear Tables Only

```bash
psql -U postgres -d eduplacement_pro

TRUNCATE TABLE training_enrollments CASCADE;
TRUNCATE TABLE interviews CASCADE;
TRUNCATE TABLE applications CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE trainings CASCADE;
TRUNCATE TABLE drives CASCADE;
TRUNCATE TABLE companies CASCADE;
TRUNCATE TABLE students CASCADE;
TRUNCATE TABLE users CASCADE;
\q
```

Then restart the application to reload demo data.

## 📈 Database Management

### Useful PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d eduplacement_pro

# List all tables
\dt

# Describe table structure
\d users
\d students

# View data
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM drives WHERE status = 'ONGOING';

# Count records
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM students;

# Exit
\q
```

### Backup Database

```bash
# Backup
pg_dump -U postgres eduplacement_pro > backup.sql

# Restore
psql -U postgres eduplacement_pro < backup.sql
```

## 🐛 Troubleshooting

### Connection Refused

```
Error: Connection refused. Check that the hostname and port are correct
```

**Solution**: Ensure PostgreSQL is running
```bash
# Windows
net start postgresql-x64-14

# macOS/Linux
sudo systemctl start postgresql
```

### Authentication Failed

```
Error: password authentication failed for user "postgres"
```

**Solution**: Reset PostgreSQL password
```bash
# Linux/macOS
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_password';
```

### Database Does Not Exist

```
Error: database "eduplacement_pro" does not exist
```

**Solution**: Create the database
```bash
psql -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

### Port Already in Use

```
Error: Bind address already in use: 5432
```

**Solution**: Check if PostgreSQL is already running or change port

### Schema Validation Failed

```
Error: Schema-validation: wrong column type
```

**Solution**: Either drop and recreate database, or set `JPA_DDL_AUTO=update`

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Hibernate Documentation](https://hibernate.org/orm/documentation/)

## 🔐 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for database users
3. **Limit database permissions** in production
4. **Use SSL/TLS** for database connections in production
5. **Regular backups** of production database
6. **Monitor database logs** for suspicious activity

---

**Need Help?** Open an issue on GitHub or contact the development team.
