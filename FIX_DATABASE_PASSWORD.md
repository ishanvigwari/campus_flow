# 🔧 Fix Database Password Issue

## ❌ The Error

```
FATAL: password authentication failed for user "postgres"
```

This means the password in your backend configuration doesn't match your actual PostgreSQL password.

## ✅ Solution - Update Database Password

### Option 1: Update Backend .env File (Recommended)

Create/update `backend/.env` file with your actual PostgreSQL password:

```bash
cd backend
# Create .env file if it doesn't exist
```

Add this to `backend/.env`:
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=YOUR_ACTUAL_POSTGRES_PASSWORD
```

Replace `YOUR_ACTUAL_POSTGRES_PASSWORD` with your real PostgreSQL password.

### Option 2: Reset PostgreSQL Password

If you don't know your PostgreSQL password, reset it:

#### Windows:
1. Open Command Prompt as Administrator
2. Navigate to PostgreSQL bin directory:
   ```cmd
   cd "C:\Program Files\PostgreSQL\15\bin"
   ```
   (Adjust version number as needed)

3. Reset password:
   ```cmd
   psql -U postgres
   ```
   If it asks for password and you don't know it, see Option 3 below.
   
   If you get in, run:
   ```sql
   ALTER USER postgres PASSWORD 'newpassword123';
   \q
   ```

4. Update `backend/.env`:
   ```env
   DATABASE_PASSWORD=newpassword123
   ```

### Option 3: Use Trust Authentication (Development Only!)

**⚠️ WARNING: This bypasses password authentication! Only for local development!**

1. Find PostgreSQL data directory (usually `C:\Program Files\PostgreSQL\15\data`)

2. Edit `pg_hba.conf` file

3. Find this line:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```

4. Change `scram-sha-256` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```

5. Restart PostgreSQL service:
   - Open Services (`Win+R` → `services.msc`)
   - Find "postgresql-x64-15" (or your version)
   - Right-click → Restart

6. Now you can connect without password:
   ```bash
   psql -U postgres
   ```

7. Set a new password:
   ```sql
   ALTER USER postgres PASSWORD 'newpassword123';
   \q
   ```

8. **IMPORTANT**: Revert `pg_hba.conf` back to `scram-sha-256` for security!

9. Update `backend/.env`:
   ```env
   DATABASE_PASSWORD=newpassword123
   ```

---

## 🧪 Test Database Connection

After updating the password, test it:

```bash
psql -U postgres -d eduplacement_pro
```

Should connect without error. If it works, your backend will work too!

---

## 📝 Complete backend/.env Example

```env
# ==========================================
# Database Configuration
# ==========================================
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE

# ==========================================
# JPA Configuration
# ==========================================
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true

# ==========================================
# JWT Configuration
# ==========================================
JWT_SECRET=campus_flow_jwt_secret_key_for_development_minimum_256_bits_long
JWT_EXPIRATION=604800000

# ==========================================
# Google OAuth (Optional)
# ==========================================
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# ==========================================
# Logging
# ==========================================
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_APP=DEBUG

# ==========================================
# CORS
# ==========================================
CORS_ALLOWED_ORIGINS=http://localhost:5173

# ==========================================
# Demo Data
# ==========================================
DEMO_DATA_ENABLED=true
```

---

## 🚀 After Fixing Password

1. **Restart Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Look for Success Message:**
   ```
   Started EduPlacementProApplication in X.XXX seconds
   Demo data initialization completed successfully!
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Try Login:**
   - Go to http://localhost:5173
   - Email: `admin@eduplacement.edu`
   - Password: `admin123`

---

## ✅ Success Checklist

- [ ] PostgreSQL password is correct in `backend/.env`
- [ ] Can connect with: `psql -U postgres -d eduplacement_pro`
- [ ] Backend starts without errors
- [ ] See "Started EduPlacementProApplication" message
- [ ] See "Demo data initialization completed" message
- [ ] Frontend can login successfully

---

## 🆘 Still Not Working?

### Check if PostgreSQL is Running:
```bash
psql -U postgres -l
```

### Check if Database Exists:
```bash
psql -U postgres -l | findstr eduplacement
```

Should show `eduplacement_pro` in the list.

### Create Database if Missing:
```bash
psql -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

### View Backend Logs:
The error messages in the terminal will tell you exactly what's wrong.

---

**Most Common Issue**: Wrong password in `backend/.env` or `.env` file doesn't exist!
