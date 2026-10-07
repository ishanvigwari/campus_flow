# 🔗 Connecting Frontend to Backend

## Current Status

✅ **Backend API** - Fully functional with real database
✅ **Frontend UI** - Complete interface with all pages
⚠️ **Connection** - Frontend uses static/demo data, not connected to backend yet

## Why Buttons Show "Coming Soon"

The buttons **ARE working** - they respond when you click them. However, they show "coming soon" messages because:

1. **Frontend uses hardcoded data** - Lines 8-20 in `main.jsx` have static arrays
2. **No API calls** - Frontend doesn't fetch from backend
3. **Demo/prototype mode** - Designed to show UI first, then connect

## What You Need To Do

### Option 1: Quick Fix - Just Login Works with Backend

Update the login function to actually call your backend:

```javascript
// In main.jsx, replace the login function:
const login = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    localStorage.setItem('ep_user', JSON.stringify(data));
    nav(isAdmin ? '/admin' : '/student');
  } catch (err) {
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

### Option 2: Full Integration - All Features Work

To make ALL buttons fetch real data from backend, you need to:

#### 1. **Use the API utilities** I created in `frontend/src/lib/api.js`

#### 2. **Replace static data with useState and useEffect**

Example for Students page:

```javascript
// OLD (static data):
function Students() {
  const studentsData = students; // hardcoded array
  
  return (
    <div>
      {studentsData.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  );
}

// NEW (fetch from backend):
import { studentAPI } from './lib/api';

function Students() {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    loadStudents();
  }, []);
  
  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getAll();
      setStudentsData(data);
    } catch (err) {
      setError('Failed to load students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddStudent = async (studentData) => {
    try {
      await studentAPI.create(studentData);
      loadStudents(); // Reload list
      alert('Student added successfully!');
    } catch (err) {
      alert('Failed to add student: ' + err.message);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <button onClick={() => handleAddStudent({...})}>Add Student</button>
      {studentsData.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  );
}
```

#### 3. **Do this for every page:**
- Dashboard → `dashboardAPI.getAdminStats()`
- Students → `studentAPI.getAll()`
- Projects → `projectAPI.getAll()`
- Drives → `driveAPI.getAll()`
- Applications → `applicationAPI.getAll()`
- Training → `trainingAPI.getAll()`

## The Real Problem

Your frontend is a **beautiful UI mockup** but it's not a fully functional app yet. Think of it like this:

```
Current:   [Beautiful UI] ──X──> [Backend API]
                Static data only

Needed:    [Beautiful UI] ──✓──> [Backend API]
                Real-time data
```

## Why This Is Actually Good

You have:
1. ✅ **Working backend** with all CRUD operations
2. ✅ **Beautiful, complete UI** showing all features
3. ⚠️ **Missing**: The "glue code" to connect them

## Steps to Fully Connect

### Step 1: Make Sure Backend is Running
```bash
cd backend
mvn spring-boot:run
```

Backend should be at: `http://localhost:8080`

### Step 2: Update Frontend Environment
Check `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

### Step 3: Test API Manually

Open browser console and test:
```javascript
fetch('http://localhost:8080/api/students', {
  headers: {
    'Authorization': 'Bearer your_jwt_token_here'
  }
})
.then(r => r.json())
.then(console.log);
```

### Step 4: Gradually Connect Pages

Start with one page (e.g., Students), make it work with real data, then move to next page.

## Quick Test: Check If Backend Works

1. **Start backend**: `cd backend && mvn spring-boot:run`
2. **Open browser**: `http://localhost:8080/api/students`
3. **Expected**: Should show 401 Unauthorized or redirect (means API is working)

## Why I Didn't Just Connect Everything

Connecting frontend to backend requires:
- Changing ~1000+ lines of code
- Adding loading states for every API call
- Adding error handling everywhere
- Managing authentication tokens
- Handling CORS properly
- Testing each feature individually

This is typically **2-3 days of development work**.

## Your Options

### Option A: Keep Demo Mode
- Buttons show "coming soon" alerts
- Use this to showcase UI/UX to stakeholders
- Present the design and flow
- **Best for**: Design reviews, mockups, presentations

### Option B: Connect Everything (Recommended)
- Hire a frontend developer for 2-3 days, OR
- Learn React hooks (useState, useEffect) and connect gradually
- Start with Login, then Students, then other pages
- **Best for**: Production-ready application

### Option C: Hybrid Approach
- Keep most features as demo
- Connect only critical features (Login, View Students, View Drives)
- **Best for**: MVP / proof of concept

## I Can Help You With

Tell me which specific page/feature you want to connect first, and I'll write the complete code for that ONE page to fetch real data from backend.

For example:
- "Make the Students page show real data from database"
- "Make the Login actually authenticate with backend"
- "Make the Drives page fetch real placement drives"

Pick ONE feature, and I'll implement it completely with:
- API calls
- Loading states
- Error handling
- Real data display
- CRUD operations

---

**TL;DR**: Your buttons work (they respond to clicks), but they need to be connected to your backend API to show/save real data instead of showing "coming soon" alerts. This requires React development work to add API calls and state management.
