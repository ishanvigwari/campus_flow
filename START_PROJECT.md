# 🚀 How to Start Campus Flow Project

## ⚠️ IMPORTANT: Backend Must Be Running First!

Login will **always fail** if the backend is not running. The "Failed to fetch" error means the frontend can't connect to the backend.

---

## 📋 Step-by-Step Startup

### Step 1: Start Backend (PostgreSQL + Spring Boot)

#### A. Make Sure PostgreSQL is Running

**Windows:**
- Open Services (Win+R, type `services.msc`)
- Find "postgresql" service
- Make sure it's "Running"

**Or check with command:**
```bash
psql -U postgres -l
```

If PostgreSQL is not running, start it.

#### B. Start Spring Boot Backend

**Open Terminal 1:**
```bash
cd C:\Users\DELL\Desktop\campus_flow\backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started EduPlacementProApplication in X.XXX seconds
```

**This means backend is ready!** ✅

Leave this terminal running. Do NOT close it.

---

### Step 2: Start Frontend (React + Vite)

**Open Terminal 2 (New Terminal):**
```bash
cd C:\Users\DELL\Desktop\campus_flow\frontend
npm run dev
```

**You should see:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Frontend is ready!** ✅

---

### Step 3: Open Browser

Go to: **http://localhost:5173**

---

### Step 4: Login

**Admin Login:**
- Click "Admin Login"
- Email: `admin@eduplacement.edu`
- Password: `admin123`
- Click "Sign in"

**Student Login:**
- Click "Student Login"  
- Email: `emma@eduplacement.edu`
- Password: `student123`
- Click "Sign in"

---

## ✅ Checklist Before Trying to Login

- [ ] PostgreSQL service is running
- [ ] Backend terminal shows "Started EduPlacementProApplication"
- [ ] Frontend terminal shows "Local: http://localhost:5173"
- [ ] Browser is at http://localhost:5173
- [ ] Using correct credentials (see above)

---

## 🐛 Troubleshooting

### "Failed to fetch" Error

**Cause**: Backend is not running or not reachable.

**Fix:**
1. Check Terminal 1 (backend)
2. Look for "Started EduPlacementProApplication"
3. If not there, backend crashed or didn't start
4. Check for errors in backend terminal
5. Make sure PostgreSQL is running
6. Make sure database `eduplacement_pro` exists

**Test backend manually:**
```bash
curl http://localhost:8080/api/companies
```

Should return JSON or error (not "connection refused")

### "Invalid credentials" Error

**Cause**: Wrong email/password or backend auth issue.

**Fix:**
Use exact credentials:
- Admin: `admin@eduplacement.edu` / `admin123`
- Student: `emma@eduplacement.edu` / `student123`

### Backend Won't Start

**Common issues:**

1. **Port 8080 already in use:**
   ```
   Error: Port 8080 is already in use
   ```
   Find and kill the process using port 8080

2. **Database connection failed:**
   ```
   Error: Connection to localhost:5432 refused
   ```
   - PostgreSQL is not running
   - Database doesn't exist
   - Wrong credentials in backend/.env

3. **Maven build failed:**
   ```
   BUILD FAILURE
   ```
   - Check Java version: `java -version` (need 17+)
   - Run: `mvn clean install` first

### Frontend Won't Start

**Common issues:**

1. **Port 5173 already in use:**
   - Close other Vite dev servers
   - Or it will suggest another port (like 5174)

2. **Module not found:**
   ```
   Error: Cannot find module
   ```
   Run: `npm install`

3. **.env not loading:**
   - Make sure .env file exists in `frontend/` directory
   - Restart dev server (Ctrl+C then `npm run dev`)

---

## 📝 Quick Commands Reference

### Check if Backend is Running:
```bash
curl http://localhost:8080/api/companies
```

### Check if Frontend is Running:
Open browser: http://localhost:5173

### Restart Backend:
```bash
# In backend terminal:
Ctrl+C
mvn spring-boot:run
```

### Restart Frontend:
```bash
# In frontend terminal:
Ctrl+C
npm run dev
```

### Check PostgreSQL:
```bash
psql -U postgres -l
```

### Create Database (if missing):
```bash
psql -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

---

## 🎯 Normal Startup Flow

**What you should see:**

### Terminal 1 (Backend):
```
[INFO] Building EduPlacement Pro Backend 1.0.0
[INFO] ------------------------------------------------------------------------
...
2024-10-07 21:00:00 - Started EduPlacementProApplication in 5.234 seconds
```

### Terminal 2 (Frontend):
```
  VITE v6.0.5  ready in 432 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Browser:
- Home page loads with "EduPlacement Pro" header
- "Student Login" and "Admin Login" buttons visible
- Clicking login → shows login form
- Enter credentials → redirects to dashboard

---

## 🔐 All Demo Accounts

From your demo data (`DataInitializer.java`):

**Admin:**
- Email: `admin@eduplacement.edu`
- Password: `admin123`
- Role: ADMIN

**Students:**
1. Emma Sullivan
   - Email: `emma@eduplacement.edu`
   - Password: `student123`
   - Major: Computer Science
   - Status: Placed

2. Marcus Chen
   - Email: `marcus@eduplacement.edu`
   - Password: `student123`
   - Major: Mechanical Engineering
   - Status: In-Process

3. Sophia Rodriguez
   - Email: `sophia@eduplacement.edu`
   - Password: `student123`
   - Major: Business Analytics
   - Status: Eligible

4. Liam O'Connor
   - Email: `liam@eduplacement.edu`
   - Password: `student123`
   - Major: Data Science
   - Status: Ineligible

5. Aisha Khan
   - Email: `aisha@eduplacement.edu`
   - Password: `student123`
   - Major: Information Systems
   - Status: Eligible

All student passwords are: `student123`

---

## 🆘 Emergency Reset

If nothing works, try this:

### 1. Stop Everything
- Close all terminals
- Stop PostgreSQL service if needed

### 2. Clean Backend
```bash
cd backend
mvn clean
```

### 3. Drop and Recreate Database
```bash
psql -U postgres
DROP DATABASE eduplacement_pro;
CREATE DATABASE eduplacement_pro;
\q
```

### 4. Restart Backend (will reload demo data)
```bash
cd backend
mvn spring-boot:run
```

### 5. Restart Frontend
```bash
cd frontend
npm run dev
```

---

## ✅ Success Indicators

When everything is working:

1. **Backend terminal**: No errors, shows "Started" message ✓
2. **Frontend terminal**: Shows local URL ✓
3. **Browser**: Home page loads ✓
4. **Login**: Redirects to dashboard after login ✓
5. **Dashboard**: Shows real data (student count, etc.) ✓
6. **Students page**: Shows list of students from database ✓

---

## 🎓 Google OAuth (Optional)

Google login button is currently disabled. To enable:

1. Follow instructions in `frontend/OAUTH_SETUP.md`
2. Get Google Client ID from Google Cloud Console
3. Update `frontend/.env`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
   ```
4. Restart frontend

For now, just use email/password login!

---

**Remember**: Always start backend FIRST, then frontend! 🎯
