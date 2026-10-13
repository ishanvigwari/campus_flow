# Google OAuth Integration Setup Guide

This guide will help you set up Google OAuth for both Admin and Student login portals.

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** (or **Google Identity API**)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add the following:
     - **Name**: EduPlacement Pro
     - **Authorized JavaScript origins**:
       - `http://localhost:5173`
       - `http://localhost:3000` (if using different port)
     - **Authorized redirect URIs**:
       - `http://localhost:5173`
       - `http://localhost:5173/login/admin`
       - `http://localhost:5173/login/student`
   
5. Click "Create" and copy your **Client ID**
   - It will look like: `123456789-abcdefg.apps.googleusercontent.com`

## Step 2: Configure Frontend

1. Open `frontend/.env` file (create if it doesn't exist)
2. Add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
VITE_API_BASE_URL=http://localhost:8080/api
```

Replace `your_actual_client_id_here` with your actual Client ID from Step 1.

## Step 3: Configure Backend

1. Open `backend/src/main/resources/application.properties`
2. Add your Google Client ID:

```properties
# Google OAuth Configuration
google.client.id=your_actual_client_id_here.apps.googleusercontent.com
```

**For H2 Profile** (if using `application-h2.properties`):
```properties
# Google OAuth Configuration
google.client.id=your_actual_client_id_here.apps.googleusercontent.com
```

## Step 4: Test the Integration

### Backend Test:
```bash
# Start the backend
cd backend
.\mvnw.cmd clean spring-boot:run "-Dspring-boot.run.profiles=h2"
```

### Frontend Test:
```bash
# In a new terminal, start the frontend
cd frontend
npm run dev
```

### Test Login Flow:

1. **Admin Login with Google**:
   - Go to http://localhost:5173/login/admin
   - Click "Continue with Google"
   - Sign in with your Google account
   - The system will create an ADMIN account for first-time Google users

2. **Student Login with Google**:
   - Go to http://localhost:5173/login/student
   - Click "Continue with Google"
   - Sign in with your Google account
   - The system will create a STUDENT account for first-time Google users

## How It Works

### Frontend Flow:
1. User clicks "Continue with Google"
2. Google OAuth popup opens
3. User authenticates with Google
4. Google returns an ID token
5. Frontend sends the ID token to backend `/api/auth/google-login` endpoint
6. Backend verifies the token and returns a JWT token
7. Frontend stores the JWT and redirects to dashboard

### Backend Flow:
1. Receives Google ID token from frontend
2. Verifies token authenticity with Google servers
3. Extracts user info (email, name, picture, Google ID)
4. Checks if user exists in database:
   - **If exists**: Returns existing user with JWT token
   - **If new**: Creates new user with specified role (admin/student)
5. Returns JWT token for subsequent API calls

## Security Notes

1. **Role Assignment**: First-time Google login creates users with the role specified in the login URL
   - `/login/admin` → Creates ADMIN role
   - `/login/student` → Creates STUDENT role

2. **Email Domain Restrictions** (Optional):
   - You can add email domain validation in `AuthService.java`
   - Example: Only allow `@youruniversity.edu` emails for students

3. **Production Setup**:
   - Use HTTPS for all URLs
   - Update Authorized Origins to your production domain
   - Never commit `.env` files with real credentials
   - Use environment variables in production

## Troubleshooting

### Error: "Invalid Google Client ID"
- Check if `VITE_GOOGLE_CLIENT_ID` is set correctly in `.env`
- Ensure the Client ID matches exactly (no extra spaces)
- Restart the frontend dev server after changing `.env`

### Error: "Invalid Google ID token"
- Backend's `google.client.id` doesn't match frontend's Client ID
- Ensure both frontend and backend use the same Client ID
- Check if the Google+ API is enabled in Google Cloud Console

### Error: "Cross-origin request blocked"
- Check CORS configuration in backend `application.properties`:
  ```properties
  cors.allowed-origins=http://localhost:5173
  ```
- Ensure the frontend URL matches the allowed origins

### Google Sign-in Button Not Working
- Check browser console for errors
- Verify that `@react-oauth/google` package is installed:
  ```bash
  npm install @react-oauth/google
  ```
- Clear browser cache and cookies

## Demo Credentials (for testing without Google)

**Admin**:
- Email: `admin@eduplacement.edu`
- Password: `admin123`

**Students**:
- Emma: `emma@eduplacement.edu` / `student123`
- Marcus: `marcus@eduplacement.edu` / `student123`
- Sophia: `sophia@eduplacement.edu` / `student123`
- Liam: `liam@eduplacement.edu` / `student123`
- Aisha: `aisha@eduplacement.edu` / `student123`

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
- [Spring Boot OAuth Documentation](https://spring.io/guides/tutorials/spring-boot-oauth2/)
