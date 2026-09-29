# EduPlacement Pro Frontend

A React + Vite frontend implementation based on the supplied Visily screens.

## Included
- Responsive landing/home page with Student Login and Admin Login.
- Separate role-based login screens.
- Email/password demo authentication.
- Google OAuth hook-up through `@react-oauth/google` using `VITE_GOOGLE_CLIENT_ID`.
- Admin-only routes: dashboard, students, projects, companies & drives, applications, reports, profile.
- Student-only routes: student dashboard and own profile.
- Sidebar/topbar, cards, tables, charts, status badges, progress bars and responsive mobile navigation matching the supplied visual language.
- Demo data so the UI is immediately usable without a backend.

## Run
```bash
npm install
cp .env.example .env
# Set VITE_GOOGLE_CLIENT_ID in .env if real Google OAuth is desired.
npm run dev
```

## Demo credentials
- Admin: `admin@eduplacement.edu` / `admin123`
- Student: `student@eduplacement.edu` / `student123`

## Important security note
The included email/password and role checks are frontend demo authentication only. For production, authentication and authorization must be enforced by a backend. In particular, the backend should validate Google ID tokens and determine the user's role from a trusted database; the browser must never be allowed to choose its own admin/student role.
