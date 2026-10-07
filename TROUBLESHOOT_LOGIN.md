# 🔧 Troubleshooting Login "Failed to Fetch" Error

## ✅ Quick Fix (Do This First!)

### 1. Stop Frontend Dev Server
Press `Ctrl+C` in the terminal running `npm run dev`

### 2. Restart Frontend
```bash
cd frontend
npm run dev
```

**Why?** The `.env` file changes require a restart to take effect!

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Backend is Running

Open a new terminal and run:
```bash
cd backend
mvn spring-boot:run
```

Look for this line in the output:
```
Started EduPlacementProApplication in X seconds
```

The backend should be accessible at: `http://localhost:8080`

### Step 2: Test Backend Directly

Open your browser and go to:
```
http://localhost:8080/api/companies
```

**Expected**: Should see JSON data or a 401/403 error (this is good - means it's working!)  
**If you see "Cannot connect"**: Backend is not running

### Step 3: Check Frontend .env File

Make sure `frontend/.env` has:
```env
VITE_API_URL=http://localhost:8080
```

**Important**: NO `/api` at the end! The backend already has `context-path=/api`

### Step 4: Restart Frontend (CRITICAL!)

Environment variables only load when the dev server starts:
```bash
# Stop the frontend (Ctrl+C)
cd frontend
npm run dev
```

### Step 5: Check Browser Console

1. Open the login page
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Try to login
5. Look for errors

**Common Errors:**

#### "Failed to fetch"
- Backend is not running
- Wrong API URL
- Need to restart frontend

#### "CORS error"
- Backend CORS not configured
- Check `backend/.env` has: `CORS_ALLOWED_ORIGINS=http://localhost:5173`

#### "401 Unauthorized"
- Credentials are wrong
- Use: `admin@eduplacement.edu` / `admin123`

#### "Network Error"
- Firewall blocking
- Backend on different port

### Step 6: Test API Call Manually

Open browser console (F12) and run:
```javascript
fetch('http://localhost:8080/api/companies')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**This should either:**
- Show data (good!)
- Show 401 error (good - means API is working)
- Show "Failed to fetch" (bad - backend not reachable)

---

## 📋 Checklist

Before trying to login, verify:

- [ ] Backend is running (`mvn spring-boot:run`)
- [ ] You see "Started EduPlacementProApplication" message
- [ ] Frontend .env has `VITE_API_URL=http://localhost:8080`
- [ ] Frontend dev server was restarted after .env change
- [ ] Browser console shows no CORS errors
- [ ] `http://localhost:8080/api/companies` responds (in browser)

---

## 🎯 The Correct Setup

### Terminal 1 (Backend):
```bash
cd C:\Users\DELL\Desktop\campus_flow\backend
mvn spring-boot:run
```

**Wait for**: "Started EduPlacementProApplication"

### Terminal 2 (Frontend):
```bash
cd C:\Users\DELL\Desktop\campus_flow\frontend
npm run dev
```

**Should show**: "Local: http://localhost:5173"

### Browser:
Go to: `http://localhost:5173`

---

## 🔐 Login Credentials

**Admin:**
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Student:**
- Email: `emma@eduplacement.edu`  
- Password: `student123`

---

## 🐛 Still Not Working?

### Check Backend Logs
Look at the terminal running the backend. When you try to login, you should see:
```
Hibernate: select ... from users where email=?
```

If you don't see any logs, the request isn't reaching the backend.

### Check Network Tab
1. Open DevTools (F12)
2. Go to "Network" tab
3. Try to login
4. Look for the login request
5. Click on it to see details

**Request URL should be**: `http://localhost:8080/api/auth/login`  
**NOT**: `http://localhost:8080/api/api/auth/login` (double /api is wrong!)

### Verify Database
Make sure PostgreSQL is running and database exists:
```bash
psql -U postgres -l
```

Should show `eduplacement_pro` in the list.

---

## 🆘 Quick Diagnostic

Run this in your terminal to check everything:

```bash
# Check if backend is responding
curl http://localhost:8080/api/companies

# Should return JSON data or error message
```

If this works, the backend is fine. Problem is frontend configuration.

---

## ✅ Success Checklist

When everything works, you should see:

1. Backend terminal: "Started EduPlacementProApplication" ✓
2. Frontend terminal: "Local: http://localhost:5173" ✓
3. Browser: Login page loads ✓
4. After login: Redirects to dashboard ✓
5. Dashboard: Shows real data from database ✓

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Failed to fetch" | Restart frontend dev server |
| "CORS error" | Check backend CORS_ALLOWED_ORIGINS |
| "401 Unauthorized" | Wrong credentials or backend auth issue |
| "Connection refused" | Backend not running |
| "Cannot read property 'token'" | Login response format issue |
| Page stays at login | Check browser console for errors |

---

**Most Common Fix**: Stop frontend (`Ctrl+C`) and restart it (`npm run dev`) after changing `.env` file!
