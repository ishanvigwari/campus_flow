# 🚀 Quick Start Guide

## ⚡ Fastest Way to Start

### Option 1: Use Setup Script (Recommended)

**Open PowerShell in the project folder and run:**
```powershell
.\setup-database.ps1
```

This will:
- Find your PostgreSQL installation
- Test connection with your password
- Create the database if needed
- Update backend/.env with correct password

Then start the servers:

**Terminal 1 - Backend:**
```bash
Double-click: START-BACKEND.bat
```
Or:
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
Double-click: START-FRONTEND.bat
```
Or:
```bash
cd frontend
npm run dev
```

---

### Option 2: Manual Setup

If you know your PostgreSQL password:

**1. Update `backend/.env` file**

Open `backend/.env` and change this line:
```env
DATABASE_PASSWORD=postgres
```
To your actual password:
```env
DATABASE_PASSWORD=your_actual_password
```

**2. Create database (if needed)**

Open PowerShell:
```powershell
# Replace YOUR_PASSWORD with your actual PostgreSQL password
$env:PGPASSWORD='YOUR_PASSWORD'
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

**3. Start Backend**

Terminal 1:
```bash
cd backend
mvn spring-boot:run
```

Wait for: `Started EduPlacementProApplication`

**4. Start Frontend**

Terminal 2:
```bash
cd frontend
npm run dev
```

**5. Open Browser**

Go to: http://localhost:5173

**6. Login**

- Email: `admin@eduplacement.edu`
- Password: `admin123`

---

## 🔑 Demo Credentials

**Admin:**
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Students:**
- Email: `emma@eduplacement.edu`
- Password: `student123`

(Also: marcus, sophia, liam, aisha @eduplacement.edu / student123)

---

## ✅ Success Checklist

When everything works:

- [ ] PostgreSQL service is running
- [ ] Database `eduplacement_pro` exists
- [ ] Backend terminal shows "Started EduPlacementProApplication"
- [ ] Backend terminal shows "Demo data initialization completed"
- [ ] Frontend shows "Local: http://localhost:5173"
- [ ] Browser loads the home page
- [ ] Login redirects to dashboard
- [ ] Dashboard shows real data (numbers from database)

---

## 🐛 Troubleshooting

### "Password authentication failed"

Your PostgreSQL password is wrong in `backend/.env`.

**Solution:**
1. Run `.\setup-database.ps1` to set correct password
2. Or manually update `backend/.env` with correct password

### "Failed to fetch" in browser

Backend is not running.

**Solution:**
1. Check Terminal 1 (backend)
2. Look for "Started EduPlacementProApplication" message
3. If not there, backend crashed - check for errors

### "Database does not exist"

Database wasn't created.

**Solution:**
Run setup script or create manually:
```powershell
$env:PGPASSWORD='your_password'
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

### "Port 8080 already in use"

Another application is using port 8080.

**Solution:**
- Find and close that application
- Or change backend port in `backend/.env`: `SERVER_PORT=8081`

---

## 📂 File Structure

```
campus_flow/
├── backend/
│   ├── .env                    ← PostgreSQL password here!
│   ├── src/
│   └── pom.xml
├── frontend/
│   ├── .env                    ← API URL here
│   ├── src/
│   └── package.json
├── setup-database.ps1          ← Run this first!
├── START-BACKEND.bat           ← Quick start backend
├── START-FRONTEND.bat          ← Quick start frontend
└── QUICK_START.md              ← You are here
```

---

## 🎯 What Each Terminal Should Show

### Backend Terminal (Must show these):
```
[INFO] Building EduPlacement Pro Backend 1.0.0
...
2026-10-07 22:00:00 - Started EduPlacementProApplication in 8.234 seconds
2026-10-07 22:00:01 - Demo data initialization completed successfully!
=================================================
DEMO CREDENTIALS:
Admin: admin@eduplacement.edu / admin123
Student: emma@eduplacement.edu / student123
=================================================
```

### Frontend Terminal:
```
  VITE v6.0.5  ready in 432 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

---

## 📝 Common Commands

### Check PostgreSQL Status
```powershell
Get-Service -Name "*postgres*"
```

### Restart Backend
```bash
# In backend terminal: Ctrl+C
cd backend
mvn spring-boot:run
```

### Restart Frontend
```bash
# In frontend terminal: Ctrl+C
cd frontend
npm run dev
```

### View Database
```powershell
$env:PGPASSWORD='your_password'
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d eduplacement_pro
```

---

## 🆘 Need More Help?

See these detailed guides:

- **FIX_DATABASE_PASSWORD.md** - Reset PostgreSQL password
- **START_PROJECT.md** - Detailed startup instructions
- **TROUBLESHOOT_LOGIN.md** - Login issues
- **DATABASE_SETUP.md** - Complete database setup

---

## 🎉 Quick Test

After starting both servers:

1. Go to: http://localhost:5173
2. Click "Admin Login"
3. Enter: `admin@eduplacement.edu` / `admin123`
4. You should see the dashboard with:
   - Total Students: 5
   - Active Projects: 3
   - Real data from database

If you see this, **everything is working!** ✅

---

**TL;DR**: Run `.\setup-database.ps1`, then start backend and frontend. Login with admin@eduplacement.edu / admin123
