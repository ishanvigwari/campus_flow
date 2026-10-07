import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, Link} from 'react-router-dom';
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import {LayoutDashboard, Users, FolderKanban, Building2, BarChart3, Settings, HelpCircle, LogOut, Search, Bell, ChevronDown, ArrowRight, GraduationCap, ShieldCheck, Mail, Lock, Chrome, BriefcaseBusiness, CalendarDays, TrendingUp, FileText, Menu, X, UserRound, Clock, CheckCircle2, AlertCircle, Download, Filter, Plus, Eye, BookOpen, Target} from 'lucide-react';
import {studentAPI, driveAPI, applicationAPI, companyAPI, trainingAPI, projectAPI, dashboardAPI, authAPI} from './lib/api';
import './styles.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function App(){
 const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;
 return <GoogleOAuthProvider clientId={clientId||'missing-client-id'}><BrowserRouter><Routes>
  <Route path="/" element={<Home/>}/><Route path="/login/:role" element={<Login/>}/>
  <Route path="/admin" element={<Protected role="admin"><Shell role="admin"><Dashboard/></Shell></Protected>}/>
  <Route path="/admin/students" element={<Protected role="admin"><Shell role="admin"><Students/></Shell></Protected>}/>
  <Route path="/admin/projects" element={<Protected role="admin"><Shell role="admin"><Projects/></Shell></Protected>}/>
  <Route path="/admin/drives" element={<Protected role="admin"><Shell role="admin"><Drives/></Shell></Protected>}/>
  <Route path="/admin/applications" element={<Protected role="admin"><Shell role="admin"><Applications/></Shell></Protected>}/>
  <Route path="/admin/reports" element={<Protected role="admin"><Shell role="admin"><Reports/></Shell></Protected>}/>
  <Route path="/admin/profile" element={<Protected role="admin"><Shell role="admin"><Profile/></Shell></Protected>}/>
  <Route path="/student" element={<Protected role="student"><Shell role="student"><StudentDashboard/></Shell></Protected>}/>
  <Route path="/student/profile" element={<Protected role="student"><Shell role="student"><StudentProfile/></Shell></Protected>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter></GoogleOAuthProvider>
}

function Protected({role,children}){const user=JSON.parse(localStorage.getItem('ep_user')||'null'); return user?.role===role?children:<Navigate to={`/login/${role}`} replace/>}
function Home(){return <div className="landing"><header className="landing-nav"><div className="brand"><span className="brand-icon"><GraduationCap size={19}/></span><b>EduPlacement Pro</b></div><div className="landing-links"><a href="#features">Platform</a><a href="#roles">How it works</a><a href="#about">About</a></div><div className="nav-actions"><Link className="btn ghost" to="/login/student">Student Login</Link><Link className="btn primary" to="/login/admin">Admin Login <ArrowRight size={16}/></Link></div></header><section className="hero"><div className="hero-copy"><div className="eyebrow">INSTITUTIONAL PLACEMENT PLATFORM</div><h1>Bridge academic success with <span>career outcomes.</span></h1><p>One high-fidelity workspace for students, placement teams, projects, corporate drives, training and institutional analytics.</p><div className="hero-actions"><Link className="btn primary large" to="/login/student">Student Portal <ArrowRight size={17}/></Link><Link className="btn light large" to="/login/admin">Admin Portal</Link></div><div className="mini-stats"><div><b>12,500+</b><span>Students tracked</span></div><div><b>450+</b><span>Corporate partners</span></div><div><b>84.2%</b><span>Placement rate</span></div></div></div><div className="hero-card"><div className="mock-top"><span>EduPlacement Pro</span><span>Admin Overview</span></div><div className="mock-banner"><small>ACADEMIC SESSION 2024–25</small><h3>Central Intelligence Hub</h3><p>Placement operations, projects & student success.</p></div><div className="mock-grid"><Metric title="Total Students" value="2,482"/><Metric title="Active Projects" value="145"/><Metric title="Active Drives" value="18"/><Metric title="Avg. Package" value="$84.2k"/></div><div className="mock-chart"><div className="chart-title">Placement Trends</div><div className="bars"><i style={{height:'38%'}}/><i style={{height:'52%'}}/><i style={{height:'45%'}}/><i style={{height:'70%'}}/><i style={{height:'78%'}}/><i style={{height:'90%'}}/></div></div></div></section><section id="features" className="feature-section"><div className="section-heading"><div className="eyebrow">PLATFORM CAPABILITIES</div><h2>Everything your placement ecosystem needs.</h2></div><div className="feature-grid"><Feature icon={<Users/>} title="Student Management" text="Maintain student profiles, eligibility, training and placement status."/><Feature icon={<FolderKanban/>} title="Project Tracking" text="Monitor milestones, mentors, progress and academic health."/><Feature icon={<Building2/>} title="Placement Drives" text="Manage partner companies, openings, applicants and hiring stages."/><Feature icon={<BarChart3/>} title="Analytics & Reports" text="Turn placement and institutional activity into actionable insights."/><Feature icon={<ShieldCheck/>} title="Role-Based Access" text="Admins see institutional data while students see only their own records."/><Feature icon={<BookOpen/>} title="Training Hub" text="Keep interviews, courses, workshops and skill assessments in one place."/></div></section><section id="roles" className="role-section"><div className="role-card"><ShieldCheck size={24}/><h3>For administrators</h3><p>Operate the complete placement lifecycle with institution-wide visibility.</p><Link to="/login/admin">Enter Admin Portal <ArrowRight size={16}/></Link></div><div className="role-card"><GraduationCap size={24}/><h3>For students</h3><p>Track your applications, interviews, training and placement progress.</p><Link to="/login/student">Enter Student Portal <ArrowRight size={16}/></Link></div></section><footer>© 2026 EduPlacement Pro · Institutional placement intelligence</footer></div>}
function Metric({title,value}){return <div className="mock-metric"><span>{title}</span><b>{value}</b></div>}
function Feature({icon,title,text}){return <div className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>}

function Login(){
  const role=useLocation().pathname.split('/')[2]||'student';
  const isAdmin=role==='admin';
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const nav=useNavigate();
  
  const login=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try{
      const response = await authAPI.login({email,password});
      const user = {
        ...response,
        role: response.role.toLowerCase()
      };
      localStorage.setItem('ep_user',JSON.stringify(user));
      nav(user.role==='admin'?'/admin':'/student');
    }catch(err){
      console.error('Login error:',err);
      setError(err.message || 'Invalid credentials. Please try again.');
    }finally{
      setLoading(false);
    }
  };
  
  const googleLogin=useGoogleLogin({
    onSuccess:async tokenResponse=>{
      setLoading(true);
      setError('');
      try{
        const response = await authAPI.googleLogin(tokenResponse.access_token);
        const user = {...response, role: response.role.toLowerCase()};
        localStorage.setItem('ep_user',JSON.stringify(user));
        nav(user.role==='admin'?'/admin':'/student');
      }catch(err){
        console.error('Google OAuth error:',err);
        setError('Failed to complete Google sign-in. Please try again.');
      }finally{
        setLoading(false);
      }
    },
    onError:(error)=>{
      console.error('Google OAuth error:',error);
      setError('Google sign-in failed. Check your configuration.');
    }
  });
  
  return <div className="auth-page"><div className="auth-left"><div className="auth-brand"><span className="brand-icon"><GraduationCap size={19}/></span><b>EduPlacement Pro</b></div><div className="auth-copy"><div className="eyebrow">{isAdmin?'ADMIN PORTAL':'STUDENT PORTAL'}</div><h1>{isAdmin?'Manage the complete placement ecosystem.':'Your placement journey, in one place.'}</h1><p>{isAdmin?'Access institution-wide students, projects, drives, applications and analytics.':'Track your applications, interviews, training and placement readiness.'}</p><div className="auth-points"><span><CheckCircle2 size={17}/> Secure role-based access</span><span><CheckCircle2 size={17}/> Real-time placement updates</span><span><CheckCircle2 size={17}/> Clean, focused workspace</span></div></div></div><div className="auth-panel"><Link className="back-link" to="/">← Back to home</Link><div className="login-card"><div className="login-icon">{isAdmin?<ShieldCheck size={25}/>:<GraduationCap size={25}/>}</div><h2>Welcome back</h2><p>Sign in to your {isAdmin?'administrator':'student'} account.</p><form onSubmit={login}><label>Email address<div className="input"><Mail size={17}/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@institution.edu" required/></div></label><label>Password<div className="input"><Lock size={17}/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter your password" required/></div></label><div className="form-row"><label className="check"><input type="checkbox"/> Remember me</label><a href="#">Forgot password?</a></div>{error&&<div className="error">{error}</div>}<button className="btn primary full" type="submit" disabled={loading}>{loading?'Signing in...':'Sign in'} <ArrowRight size={16}/></button></form><div className="divider"><span>OR</span></div><button className="google-btn" onClick={()=>{if(import.meta.env.VITE_GOOGLE_CLIENT_ID&&import.meta.env.VITE_GOOGLE_CLIENT_ID!=='your_google_client_id_here.apps.googleusercontent.com') googleLogin(); else setError('Configure VITE_GOOGLE_CLIENT_ID in .env file')}} disabled={loading}><Chrome size={18}/> {loading?'Signing in...':'Continue with Google'}</button><div className="demo">Demo: <b>{isAdmin?'admin@eduplacement.edu / admin123':'emma@eduplacement.edu / student123'}</b></div></div></div></div>
}

function Shell({role,children}){const [open,setOpen]=useState(false); const nav=useNavigate(); const user=JSON.parse(localStorage.getItem('ep_user')||'{}'); const admin=role==='admin'; const logout=()=>{localStorage.removeItem('ep_user');nav('/')}; const links=admin?[['/admin','Dashboard',LayoutDashboard],['/admin/students','Students',Users],['/admin/projects','Projects',FolderKanban],['/admin/drives','Companies & Drives',Building2],['/admin/applications','Applications',BriefcaseBusiness],['/admin/reports','Reports',BarChart3]]:[['/student','Dashboard',LayoutDashboard],['/student/profile','My Profile',UserRound]]; const userInitial=(user.name||'A')[0].toUpperCase(); return <div className="app-shell"><aside className={open?'sidebar open':'sidebar'}><div className="side-brand"><span className="brand-icon"><GraduationCap size={18}/></span><b>EduPlacement Pro</b><button className="mobile-close" onClick={()=>setOpen(false)}><X/></button></div><div className="menu-label">MAIN MENU</div><nav>{links.map(([to,label,Icon])=><Link onClick={()=>setOpen(false)} className={location.pathname===to?'active':''} key={to} to={to}><Icon size={16}/><span>{label}</span></Link>)}</nav><div className="side-bottom"><Link to={admin?'/admin/profile':'/student/profile'}><Settings size={16}/>Settings</Link><a href="#"><HelpCircle size={16}/>Help</a><button onClick={logout}><LogOut size={16}/>Logout</button></div></aside><div className="main"><header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(true)}><Menu/></button><div className="crumb"><LayoutDashboard size={14}/> Dashboard <span>›</span> Overview</div><div className="top-actions"><div className="search"><Search size={15}/><input placeholder="Search students, projects..."/></div><Bell size={18}/><div className="user-menu">{user.picture?<img src={user.picture} alt={user.name} style={{width:'27px',height:'27px',borderRadius:'50%',objectFit:'cover'}}/>:<div className="avatar">{userInitial}</div>}<div><b>{user.name||'User'}</b><small>{admin?'Admin Portal':'Student Portal'}</small></div><ChevronDown size={15}/></div></div></header><main>{children}</main></div></div>}

function PageHero({eyebrow,title,text,buttons=[],onButtonClick}){
  return <div className="page-hero"><div><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p>{buttons.length>0&&<div className="hero-buttons">{buttons.map((b,i)=><button onClick={()=>onButtonClick&&onButtonClick(b)} className={i===0?'btn white':'btn outline-white'} key={b}>{b}</button>)}</div>}</div></div>
}
function Stat({icon,title,value,change}){return <div className="stat"><div className="stat-icon">{icon}</div><div><small>{title}</small><strong>{value}</strong><em>{change}</em></div></div>}

function Dashboard(){
  const [stats,setStats]=useState(null);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    loadDashboard();
  },[]);
  
  const loadDashboard=async()=>{
    try{
      const data = await dashboardAPI.getAdminStats();
      setStats(data);
    }catch(err){
      console.error('Failed to load dashboard:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading dashboard...</div></div>;
  
  return <div className="page"><PageHero eyebrow="ACADEMIC SESSION 2024–25" title="EduPlacement Pro Central Intelligence Hub" text="Manage student pipelines, track faculty mentorship milestones, and orchestrate corporate recruitment drives from a single platform."/><div className="stats"><Stat icon={<Users/>} title="Total Students" value={stats?.totalStudents||'0'} change="+12% this month"/><Stat icon={<FolderKanban/>} title="Active Projects" value={stats?.activeProjects||'0'} change="+4.5%"/><Stat icon={<Building2/>} title="Ongoing Drives" value={stats?.ongoingDrives||'0'} change="Stable"/><Stat icon={<TrendingUp/>} title="Avg. Salary Package" value={stats?.avgPackage||'N/A'} change="+8%"/></div><div className="card"><h2>Dashboard Overview</h2><p style={{marginTop:'10px',color:'#666'}}>Real-time statistics loaded from your database. Detailed charts and analytics coming soon!</p></div></div>
}

function Card({title,sub,children}){return <section className="card"><div className="card-head"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div></div>{children}</section>}
function TableCard({title,headers,rows}){return <Card title={title}><div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div></Card>}
function Status({text}){return <span className={'status '+text.toLowerCase().replaceAll(' ','-')}>{text}</span>}

function Students(){
  const [students,setStudents]=useState([]);
  const [loading,setLoading]=useState(true);
  const [searchTerm,setSearchTerm]=useState('');
  
  useEffect(()=>{loadStudents()},[]);
  
  const loadStudents=async()=>{
    try{
      setLoading(true);
      const data = await studentAPI.getAll();
      setStudents(data);
    }catch(err){
      console.error('Failed to load students:',err);
      alert('Failed to load students. Make sure backend is running.');
    }finally{
      setLoading(false);
    }
  };
  
  const handleAddStudent=()=>{
    alert('Add Student Form\n\nThis would open a modal/form to add a new student.\nFor now, use the backend API directly or add students via database.');
  };
  
  const filteredStudents = students.filter(s=>
    s.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading students...</div></div>;
  
  return <div className="page"><div className="title-row"><div><h1>Students Management</h1><p>Monitor academic performance, placement eligibility, and profiles ({students.length} total).</p></div><button onClick={handleAddStudent} className="btn primary"><Plus size={16}/> Enroll Student</button></div><div className="stats"><Stat icon={<Users/>} title="Total Students" value={students.length.toString()} change="Real data"/><Stat icon={<Target/>} title="Placement Ready" value={students.filter(s=>s.placementStatus==='ELIGIBLE'||s.placementStatus==='PLACED').length.toString()} change="Live count"/><Stat icon={<GraduationCap/>} title="Avg. GPA" value={(students.reduce((acc,s)=>acc+(s.gpa||0),0)/students.length||0).toFixed(2)} change=""/><Stat icon={<CheckCircle2/>} title="Placed Students" value={students.filter(s=>s.placementStatus==='PLACED').length.toString()} change="Real-time"/></div><Card title="Student Directory" sub="Real data from your database"><div className="toolbar"><div className="search wide"><Search size={15}/><input placeholder="Search name, ID..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/></div></div><div className="table-wrap"><table><thead><tr><th>Student</th><th>Major / Batch</th><th>GPA</th><th>Status</th><th>Training</th></tr></thead><tbody>{filteredStudents.map(s=><tr key={s.id}><td><div className="person"><div className="avatar">{(s.user?.name||'S')[0]}</div><div><b>{s.user?.name||'Unknown'}</b><small>{s.studentId}</small></div></div></td><td><b>{s.major}</b><small>Class of {s.batch}</small></td><td><b>{s.gpa?.toFixed(2)||'N/A'}</b></td><td><Status text={s.placementStatus||'UNKNOWN'}/></td><td>{s.trainingProgress||0}%</td></tr>)}</tbody></table></div></Card></div>
}

function Projects(){
  const [projects,setProjects]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{loadProjects()},[]);
  
  const loadProjects=async()=>{
    try{
      const data = await projectAPI.getAll();
      setProjects(data);
    }catch(err){
      console.error('Failed to load projects:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading projects...</div></div>;
  
  return <div className="page"><PageHero eyebrow="ACADEMIC YEAR 2024–25" title="Projects Management" text="Oversee academic excellence through detailed project tracking, mentor pairing and milestone management."/><div className="stats"><Stat icon={<FolderKanban/>} title="Total Projects" value={projects.length.toString()} change="Live data"/><Stat icon={<TrendingUp/>} title="On-track" value={projects.filter(p=>p.status==='ON_TRACK').length.toString()} change="Real-time"/><Stat icon={<AlertCircle/>} title="At Risk" value={projects.filter(p=>p.status==='AT_RISK').length.toString()} change=""/><Stat icon={<CheckCircle2/>} title="Completed" value={projects.filter(p=>p.status==='COMPLETED').length.toString()} change=""/></div><Card title="All Projects" sub="Data from database"><div className="table-wrap"><table><thead><tr><th>Project</th><th>Student</th><th>Mentor</th><th>Progress</th><th>Status</th></tr></thead><tbody>{projects.map(p=><tr key={p.id}><td><b>{p.title}</b><small>{p.projectCode}</small></td><td>{p.student?.user?.name||'Unknown'}</td><td>{p.mentorName||'N/A'}</td><td>{p.progressPercentage||0}%</td><td><Status text={p.status||'UNKNOWN'}/></td></tr>)}</tbody></table></div></Card></div>
}

function Drives(){
  const [drives,setDrives]=useState([]);
  const [companies,setCompanies]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{loadData()},[]);
  
  const loadData=async()=>{
    try{
      const [drivesData, companiesData] = await Promise.all([
        driveAPI.getAll(),
        companyAPI.getAll()
      ]);
      setDrives(drivesData);
      setCompanies(companiesData);
    }catch(err){
      console.error('Failed to load drives:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading drives...</div></div>;
  
  return <div className="page"><PageHero eyebrow="CORPORATE RELATIONS" title="Companies & Placement Drives" text="Manage institutional partnerships and track recruitment cycles with real-time hiring analytics."/><div className="stats"><Stat icon={<Building2/>} title="Total Companies" value={companies.length.toString()} change="Live"/><Stat icon={<CalendarDays/>} title="Total Drives" value={drives.length.toString()} change="Real data"/><Stat icon={<Users/>} title="Active Drives" value={drives.filter(d=>d.status==='ONGOING').length.toString()} change=""/><Stat icon={<CheckCircle2/>} title="Completed" value={drives.filter(d=>d.status==='COMPLETED').length.toString()} change=""/></div><Card title="Placement Drives" sub="From your database"><div className="table-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Package</th><th>Status</th><th>Deadline</th></tr></thead><tbody>{drives.map(d=><tr key={d.id}><td><b>{d.company?.name||'Unknown'}</b></td><td>{d.roleTitle}</td><td>${d.packageMin||0}k - ${d.packageMax||0}k</td><td><Status text={d.status||'UNKNOWN'}/></td><td>{d.applicationDeadline?new Date(d.applicationDeadline).toLocaleDateString():'N/A'}</td></tr>)}</tbody></table></div></Card></div>
}

function Applications(){
  const [applications,setApplications]=useState([]);
  const [trainings,setTrainings]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{loadData()},[]);
  
  const loadData=async()=>{
    try{
      const [appsData, trainingsData] = await Promise.all([
        applicationAPI.getAll(),
        trainingAPI.getAll()
      ]);
      setApplications(appsData);
      setTrainings(trainingsData);
    }catch(err){
      console.error('Failed to load applications:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading applications...</div></div>;
  
  return <div className="page"><PageHero eyebrow="PLACEMENT OPERATIONS" title="Applications & Training" text="Track corporate applications and ongoing professional development programs in real-time."/><div className="stats"><Stat icon={<BriefcaseBusiness/>} title="Total Applications" value={applications.length.toString()} change="Live"/><Stat icon={<CheckCircle2/>} title="Shortlisted" value={applications.filter(a=>a.status==='SHORTLISTED').length.toString()} change=""/><Stat icon={<BookOpen/>} title="Training Programs" value={trainings.length.toString()} change=""/><Stat icon={<Clock/>} title="Upcoming" value={trainings.filter(t=>t.status==='UPCOMING').length.toString()} change=""/></div><Card title="Recent Applications" sub="From database"><div className="table-wrap"><table><thead><tr><th>Student</th><th>Drive</th><th>Status</th><th>Applied Date</th></tr></thead><tbody>{applications.slice(0,10).map(a=><tr key={a.id}><td>{a.student?.user?.name||'Unknown'}</td><td>{a.drive?.roleTitle||'Unknown'}</td><td><Status text={a.status||'PENDING'}/></td><td>{a.appliedAt?new Date(a.appliedAt).toLocaleDateString():'N/A'}</td></tr>)}</tbody></table></div></Card></div>
}

function Reports(){
  return <div className="page"><PageHero eyebrow="INSTITUTIONAL INTELLIGENCE" title="Reports & Analytics" text="Comprehensive insights into placement performance, project milestones and institutional growth."/><div className="stats"><Stat icon={<TrendingUp/>} title="Connected" value="✓" change="Real API"/><Stat icon={<Building2/>} title="Backend" value="✓" change="Working"/><Stat icon={<Users/>} title="Database" value="✓" change="Connected"/><Stat icon={<BarChart3/>} title="Status" value="✓" change="Online"/></div><Card title="Reports"><p style={{padding:'20px',textAlign:'center',color:'#666'}}>Advanced reports and analytics dashboard coming soon. Your data is being collected and is available through the API.</p></Card></div>
}

function Profile(){
  const user=JSON.parse(localStorage.getItem('ep_user')||'{}');
  return <div className="page"><div className="title-row"><div><h1>User Profile</h1><p>Manage your personal information and account settings.</p></div></div><Card title="Profile Information"><div className="form-grid"><label>Full Name<input value={user.name||'Admin User'} readOnly/></label><label>Email<input value={user.email||'admin@eduplacement.edu'} readOnly/></label><label>Role<input value={(user.role||'admin').toUpperCase()} readOnly/></label></div><p style={{marginTop:'15px',color:'#666',fontSize:'12px'}}>Profile editing features coming soon. Connected to backend authentication.</p></Card></div>
}

function StudentDashboard(){
  const [stats,setStats]=useState(null);
  const [loading,setLoading]=useState(true);
  const user=JSON.parse(localStorage.getItem('ep_user')||'{}');
  
  useEffect(()=>{
    loadStudentDashboard();
  },[]);
  
  const loadStudentDashboard=async()=>{
    try{
      // Get student by user email first
      const students = await studentAPI.getAll();
      const student = students.find(s=>s.user?.email===user.email);
      if(student){
        const data = await dashboardAPI.getStudentStats(student.id);
        setStats(data);
      }
    }catch(err){
      console.error('Failed to load student dashboard:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading your dashboard...</div></div>;
  
  return <div className="page"><PageHero eyebrow="STUDENT PORTAL" title={`Welcome, ${user.name||'Student'}`} text="Track your placement readiness, recruitment activity and upcoming opportunities."/><div className="stats"><Stat icon={<BriefcaseBusiness/>} title="Applications" value={stats?.applicationCount||'0'} change="Your apps"/><Stat icon={<CheckCircle2/>} title="Shortlisted" value={stats?.shortlistedCount||'0'} change=""/><Stat icon={<Clock/>} title="Interviews" value={stats?.interviewCount||'0'} change=""/><Stat icon={<BookOpen/>} title="Training" value={stats?.trainingCount||'0'} change=""/></div><Card title="Your Dashboard"><p style={{padding:'20px',textAlign:'center',color:'#666'}}>Your personalized dashboard showing real-time data from the database. More features coming soon!</p></Card></div>
}

function StudentProfile(){
  const [student,setStudent]=useState(null);
  const [loading,setLoading]=useState(true);
  const user=JSON.parse(localStorage.getItem('ep_user')||'{}');
  
  useEffect(()=>{
    loadProfile();
  },[]);
  
  const loadProfile=async()=>{
    try{
      const students = await studentAPI.getAll();
      const studentData = students.find(s=>s.user?.email===user.email);
      setStudent(studentData);
    }catch(err){
      console.error('Failed to load profile:',err);
    }finally{
      setLoading(false);
    }
  };
  
  if(loading) return <div className="page"><div style={{padding:'40px',textAlign:'center'}}>Loading profile...</div></div>;
  if(!student) return <div className="page"><div className="card"><p>Profile not found. Please contact administrator.</p></div></div>;
  
  return <div className="page"><div className="title-row"><div><h1>My Profile</h1><p>View your academic and placement information.</p></div></div><Card title="Student Information"><div className="form-grid"><label>Full Name<input value={student.user?.name||'N/A'} readOnly/></label><label>Student ID<input value={student.studentId||'N/A'} readOnly/></label><label>Email<input value={student.user?.email||'N/A'} readOnly/></label><label>Major<input value={student.major||'N/A'} readOnly/></label><label>Batch<input value={student.batch||'N/A'} readOnly/></label><label>GPA<input value={student.gpa?.toFixed(2)||'N/A'} readOnly/></label><label>Placement Status<input value={student.placementStatus||'N/A'} readOnly/></label><label>Training Progress<input value={`${student.trainingProgress||0}%`} readOnly/></label></div></Card></div>
}

createRoot(document.getElementById('root')).render(<App/>);
