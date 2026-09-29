# Google OAuth Setup Guide for EduPlacement Pro

This guide will walk you through setting up Google OAuth authentication for the EduPlacement Pro application.

## Prerequisites
- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "EduPlacement Pro")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, select your project
2. Go to "APIs & Services" > "Library"
3. Search for "Google+ API" or "Google Identity Services"
4. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (or "Internal" if using Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - **App name**: EduPlacement Pro
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. On the "Scopes" page, click "Add or Remove Scopes"
7. Add these scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
8. Click "Save and Continue"
9. Add test users (your email and any others who need access during development)
10. Click "Save and Continue"
11. Review and click "Back to Dashboard"

## Step 4: Create OAuth 2.0 Client ID

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Configure the settings:
   - **Name**: EduPlacement Pro Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (Vite default port)
     - `http://localhost:3000` (alternative)
     - Add your production domain when ready
   - **Authorized redirect URIs**: 
     - `http://localhost:5173`
     - `http://localhost:3000`
     - Add production URIs when ready
5. Click "Create"
6. **Copy your Client ID** - you'll need this for the `.env` file

## Step 5: Configure Your Application

1. In your project root, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
   ```

3. Save the file

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. Click "Admin Login" or "Student Login"
4. Click "Continue with Google"
5. You should see the Google sign-in popup
6. Sign in with a test user account

## Important Security Notes

⚠️ **Current Limitations:**
- The current implementation uses frontend-only authentication
- User roles (admin/student) are assigned client-side
- For production, you MUST implement backend authentication:
  1. Send the Google ID token to your backend
  2. Verify the token server-side
  3. Determine user roles from your database
  4. Issue secure session tokens (JWT/cookies)

⚠️ **Never expose secrets:**
- The Google Client ID is safe to expose (it's public)
- Never commit actual `.env` files to version control
- Keep `.env` in your `.gitignore`

## Troubleshooting

### "redirect_uri_mismatch" error
- Ensure the redirect URI in Google Console matches exactly: `http://localhost:5173`
- Include both with and without trailing slash if needed

### "Access blocked: This app's request is invalid"
- Complete the OAuth consent screen configuration
- Add your email as a test user
- Ensure required scopes are added

### "popup_closed_by_user"
- This is normal if the user closes the popup
- The error handling in the app will display a message

### Client ID not found
- Verify `.env` file is in the project root (same level as `package.json`)
- Restart the dev server after creating/modifying `.env`
- Check that the variable name is exactly `VITE_GOOGLE_CLIENT_ID`

## Next Steps for Production

1. **Backend Implementation:**
   - Create an API endpoint to verify Google tokens
   - Use `google-auth-library` (Node.js) to verify tokens
   - Store user data in a database
   - Implement proper session management

2. **Enhanced Security:**
   - Add CSRF protection
   - Implement rate limiting
   - Add secure HTTP-only cookies
   - Use HTTPS in production

3. **Publish OAuth App:**
   - Complete OAuth verification process
   - Move from test mode to production
   - Update authorized domains

## Resources

- [Google Identity Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [React OAuth Library](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
