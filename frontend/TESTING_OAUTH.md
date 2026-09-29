# Testing Google OAuth Integration

This guide will help you test and verify that your Google OAuth integration is working correctly.

## Prerequisites

Before testing, ensure you have:
- ✅ Completed the setup in `OAUTH_SETUP.md`
- ✅ Added your real Google Client ID to `.env`
- ✅ Added test users in Google Cloud Console

## Quick Start Test

1. **Start the development server:**
   ```bash
   npm install  # If you haven't already
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - You should see the EduPlacement Pro landing page

3. **Test OAuth Login:**
   - Click either "Admin Login" or "Student Login"
   - Click "Continue with Google" button
   - A Google sign-in popup should appear

## Expected Behavior

### ✅ Successful OAuth Flow

1. **Popup Opens:**
   - Google sign-in window appears
   - Shows "Sign in with Google" screen

2. **Account Selection:**
   - Choose a Google account
   - Grant permissions when prompted

3. **Redirect & Login:**
   - Popup closes automatically
   - You're redirected to the dashboard
   - Your Google profile name appears in the top-right
   - Your Google profile picture shows (if available)

### ✅ User Information Stored

After successful login, check browser localStorage:
1. Open browser DevTools (F12)
2. Go to "Application" tab → "Local Storage" → `http://localhost:5173`
3. Find key: `ep_user`
4. Should contain:
   ```json
   {
     "role": "admin", // or "student"
     "name": "Your Name",
     "email": "your.email@gmail.com",
     "picture": "https://...",
     "googleId": "1234567890..."
   }
   ```

## Testing Scenarios

### Test 1: Admin Login with Google OAuth

1. Go to homepage
2. Click "Admin Login"
3. Click "Continue with Google"
4. Sign in with your Google account
5. **Expected:** Dashboard shows with admin menu (Students, Projects, Drives, etc.)

### Test 2: Student Login with Google OAuth

1. Go to homepage (or logout first)
2. Click "Student Login"
3. Click "Continue with Google"
4. Sign in with your Google account
5. **Expected:** Student dashboard shows with limited menu (Dashboard, My Profile)

### Test 3: Demo Credentials (Fallback)

1. Go to login page
2. Use demo credentials:
   - **Admin:** `admin@eduplacement.edu` / `admin123`
   - **Student:** `student@eduplacement.edu` / `student123`
3. **Expected:** Login works without Google OAuth

### Test 4: Profile Picture Display

1. Login with Google OAuth
2. Check top-right corner
3. **Expected:** Your Google profile picture displays instead of initials

### Test 5: Logout & Re-login

1. Login with Google OAuth
2. Click logout button
3. **Expected:** Redirected to homepage, localStorage cleared
4. Login again
5. **Expected:** Works seamlessly

## Common Issues & Solutions

### Issue: "Add your real VITE_GOOGLE_CLIENT_ID to .env file"

**Cause:** Client ID not configured or using placeholder value

**Solution:**
1. Open `.env` file
2. Replace `your_google_client_id_here.apps.googleusercontent.com` with your real Client ID
3. Restart dev server (`Ctrl+C`, then `npm run dev`)

---

### Issue: "redirect_uri_mismatch"

**Cause:** Authorized redirect URI not configured correctly

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add to "Authorized JavaScript origins":
   - `http://localhost:5173`
4. Add to "Authorized redirect URIs":
   - `http://localhost:5173`
5. Save and try again (may take a few minutes to propagate)

---

### Issue: "Access blocked: This app's request is invalid"

**Cause:** OAuth consent screen not fully configured

**Solution:**
1. Go to Google Cloud Console → OAuth consent screen
2. Complete all required fields
3. Add required scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
4. Add your email as a test user
5. Save and try again

---

### Issue: Popup closes immediately or "popup_closed_by_user"

**Cause:** User closed popup or popup was blocked

**Solution:**
- Ensure popup blockers are disabled
- Try again and complete the sign-in
- Check browser console for specific errors

---

### Issue: "Failed to fetch user info"

**Cause:** Network error or API access issue

**Solution:**
1. Check browser console for detailed error
2. Verify Google+ API or Google Identity Services is enabled
3. Check network connection
4. Try signing out and back in

---

### Issue: Profile picture not showing

**Cause:** User account doesn't have a profile picture

**Solution:**
- This is normal - the app will show initials instead
- Add a profile picture to your Google account if desired

---

### Issue: Changes to `.env` not taking effect

**Cause:** Dev server needs restart after `.env` changes

**Solution:**
1. Stop the dev server (`Ctrl+C`)
2. Restart: `npm run dev`
3. Clear browser cache if needed

## Debugging Tips

### Check Browser Console

Open DevTools (F12) and look for:
- ✅ No red errors = good
- ❌ Red errors = read the message for clues

### Verify Environment Variable

In browser console, type:
```javascript
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
```

Should show your Client ID, not `undefined` or placeholder.

### Check Network Requests

1. Open DevTools → Network tab
2. Click "Continue with Google"
3. Look for request to `https://www.googleapis.com/oauth2/v3/userinfo`
4. Should return 200 status with your user info

### Inspect localStorage

```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('ep_user')))
```

Should show your user object after login.

## Security Checklist

Before going to production:

- [ ] **Never commit `.env` to version control**
  - Verify `.env` is in `.gitignore`
  
- [ ] **Implement backend authentication**
  - Frontend-only auth is for demo purposes
  - Backend must verify Google tokens
  
- [ ] **Use HTTPS in production**
  - Update authorized origins in Google Console
  
- [ ] **Implement proper role management**
  - Don't trust client-side role assignment
  - Fetch roles from backend database
  
- [ ] **Add rate limiting**
  - Prevent abuse of OAuth endpoints
  
- [ ] **Complete OAuth verification**
  - Required to move from test mode to production
  - Follow Google's verification process

## Verification Checklist

After setup, verify:

- [ ] Google sign-in popup appears
- [ ] Can sign in with test Google account
- [ ] User name displays correctly
- [ ] Profile picture displays (if available)
- [ ] Can navigate between pages while logged in
- [ ] Logout works correctly
- [ ] Can't access protected routes when logged out
- [ ] Demo credentials still work as fallback
- [ ] No console errors during OAuth flow
- [ ] Role-based routing works (admin vs student)

## Next Steps

Once OAuth is working:

1. **Test with multiple accounts** to ensure consistency
2. **Test on different browsers** (Chrome, Firefox, Edge)
3. **Test on mobile devices** for responsive behavior
4. **Plan backend integration** for production security
5. **Consider adding more OAuth providers** (Microsoft, GitHub, etc.)

## Getting Help

If you're still having issues:

1. Check the browser console for specific error messages
2. Review the Google Cloud Console audit logs
3. Verify all steps in `OAUTH_SETUP.md` were completed
4. Check Google's OAuth 2.0 documentation
5. Ensure you're using a test user account (if in testing mode)

## Useful Commands

```bash
# Start dev server
npm run dev

# Check if .env file exists
ls .env  # or: dir .env (Windows)

# View .env contents (be careful not to share!)
cat .env  # or: type .env (Windows)

# Reinstall dependencies if issues
rm -rf node_modules package-lock.json  # or: rmdir /s node_modules, del package-lock.json (Windows)
npm install
```

## Success Criteria

Your OAuth integration is working if:

✅ Google sign-in popup opens without errors  
✅ After sign-in, you see the dashboard  
✅ Your Google name appears in the UI  
✅ Your profile picture displays (or initials if no picture)  
✅ Navigation works normally  
✅ Logout clears session  
✅ No console errors  
✅ Can re-login successfully  

---

**Congratulations!** 🎉 If all tests pass, your Google OAuth integration is functional!
