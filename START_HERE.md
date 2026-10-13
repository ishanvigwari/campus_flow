# 🚀 Quick Start Guide - Campus Flow

## ⚠️ IMPORTANT: Run Commands from Correct Directory!

### ❌ Wrong (This will fail):
```bash
# DON'T run from root directory
cd ~/Desktop/campus_flow
mvn spring-boot:run  # ❌ FAILS - No pom.xml here
```

### ✅ Correct:
```bash
# Run from backend directory
cd ~/Desktop/campus_flow/backend
mvn spring-boot:run  # ✅ WORKS
```

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Java 17+ installed (`java -version`)
- [ ] Maven installed (`mvn -v`)
- [ ] PostgreSQL 12+ installed and running
- [ ] Node.js 16+ installed (`node -v`)
- [ ] npm installed (`npm -v`)

## 🗄️ Step 1: Set Up Database

### Option A: Using pgAdmin (Recommended for Windows)

1. Open **pgAdmin** (search in Start menu)
2. Connect to your PostgreSQL server (usually localhost)
3. Right-click on "Databases" → "Create" → "Database..."
4. Name: `eduplacement_pro`
5. Click "Save"

### Option B: Using Command Line

If PostgreSQL is in your PATH:
```bash
psql -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

If not, find PostgreSQL installation (usually `C:\Program Files\PostgreSQL\<version>\bin\`) and run:
```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -c "CREATE DATABASE eduplacement_pro;"
```

### Verify Database Created

In pgAdmin, you should see `eduplacement_pro` under Databases.

## 🔧 Step 2: Configure Backend

### 2.1: Check Environment File

The `.env` file already exists at `backend/.env` with default settings:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

### 2.2: Update Database Password

**If your PostgreSQL password is NOT "postgres":**

1. Open `backend/.env` in a text editor
2. Change this line:
   ```env
   DATABASE_PASSWORD=postgres
   ```
   To your actual password:
   ```env
   DATABASE_PASSWORD=your_actual_password
   ```
3. Save the file

## ▶️ Step 3: Run Backend

### 3.1: Navigate to Backend Directory
```bash
cd ~/Desktop/campus_flow/backend
```

### 3.2: Build and Run
```bash
# First time: Clean and install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

### 3.3: Wait for Success Message

You should see:
```
✓ Started EduPlacementProApplication in X seconds
✓ Demo data initialization completed successfully!
✓ DEMO CREDENTIALS:
  Admin: admin@eduplacement.edu / admin123
  Student: emma@eduplacement.edu / student123
```

The backend is now running at: **http://localhost:8080**

## 🎨 Step 4: Run Frontend

### 4.1: Open New Terminal

**Keep the backend running!** Open a new terminal window.

### 4.2: Navigate to Frontend Directory
```bash
cd ~/Desktop/campus_flow/frontend
```

### 4.3: Install Dependencies (First Time Only)
```bash
npm install
```

### 4.4: Run Development Server
```bash
npm run dev
```

The frontend will start at: **http://localhost:5173**

## 🎉 Step 5: Access the Application

Open your browser and go to: **http://localhost:5173**

### Test Login

**Admin Account:**
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Student Account:**
- Email: `emma@eduplacement.edu`
- Password: `student123`

## 🐛 Common Issues & Solutions

### Issue 1: "mvn: command not found"
**Solution**: Install Maven from https://maven.apache.org/download.cgi

### Issue 2: "java: command not found"
**Solution**: Install Java 17+ from https://adoptium.net/

### Issue 3: "Connection refused to database"
**Solutions**:
1. Make sure PostgreSQL service is running
   - Windows: Open Services → Find "postgresql" → Start
2. Verify database exists in pgAdmin
3. Check password in `backend/.env`

### Issue 4: "Port 8080 already in use"
**Solution**: 
- Kill the process using port 8080, OR
- Change port in `backend/.env`:
  ```env
  SERVER_PORT=8081
  ```

### Issue 5: "Port 5173 already in use"
**Solution**:
- Kill the process using port 5173, OR
- The terminal will suggest an alternative port

### Issue 6: "Schema validation failed"
**Solution**:
1. Drop and recreate the database in pgAdmin
2. Restart the backend

### Issue 7: Demo data not loading
**Solution**: Ensure `DEMO_DATA_ENABLED=true` in `backend/.env`

## 📂 Project Structure

```
campus_flow/
├── backend/              ← Spring Boot API
│   ├── .env             ← Database config (already created)
│   ├── pom.xml          ← Maven config
│   └── src/             ← Java source code
│
└── frontend/            ← React app
    ├── package.json     ← npm config
    └── src/             ← React source code
```

## 🔑 Important Commands Reference

### Backend Commands (run from `backend/` directory)
```bash
mvn clean install        # Build project
mvn spring-boot:run      # Run application
mvn test                # Run tests
```

### Frontend Commands (run from `frontend/` directory)
```bash
npm install             # Install dependencies
npm run dev             # Run dev server
npm run build           # Build for production
```

## 📊 What Demo Data Includes

- **1 Admin User**: Full access to all features
- **5 Students**: Various majors and placement statuses
- **5 Companies**: Different industries
- **3 Placement Drives**: Active, shortlisting, upcoming
- **Interviews**: Scheduled interviews for students
- **Projects**: Student projects in various stages
- **Training Programs**: Workshops, courses, seminars

## 🔄 Reset Everything

If something goes wrong and you want to start fresh:

### 1. Stop both servers (Ctrl+C in both terminals)

### 2. Drop database in pgAdmin
- Right-click `eduplacement_pro` → Delete/Drop

### 3. Recreate database
- Create new database: `eduplacement_pro`

### 4. Restart backend
```bash
cd backend
mvn spring-boot:run
```

Demo data will reload automatically!

## 📚 Additional Resources

- **Database Setup**: See `DATABASE_SETUP.md`
- **API Documentation**: See `backend/README.md`
- **Frontend Guide**: See `frontend/README.md`
- **Contributing**: See `CONTRIBUTING.md`

## 💡 Pro Tips

1. **Always run backend first**, then frontend
2. **Keep both terminals open** while developing
3. **Check browser console** for frontend errors
4. **Check terminal output** for backend errors
5. **Use pgAdmin** to view database tables and data

## ✅ Quick Checklist

Before asking for help, verify:
- [ ] PostgreSQL is running
- [ ] Database `eduplacement_pro` exists
- [ ] Password in `backend/.env` is correct
- [ ] Running `mvn spring-boot:run` from `backend/` directory
- [ ] Backend shows "Started" message
- [ ] Running `npm run dev` from `frontend/` directory
- [ ] Browser can access http://localhost:5173

## 🆘 Need Help?

1. Check error messages carefully
2. Review this guide
3. Check `DATABASE_SETUP.md` for detailed troubleshooting
4. Open an issue on GitHub

---

**Happy Coding! 🚀**

**Repository**: https://github.com/ishanvigwari/campus_flow
