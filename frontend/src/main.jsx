import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, Link} from 'react-router-dom';
import {LayoutDashboard, Users, FolderKanban, Building2, BarChart3, Settings, HelpCircle, LogOut, Search, Bell, ChevronDown, ArrowRight, GraduationCap, ShieldCheck, Mail, Lock, Chrome, BriefcaseBusiness, CalendarDays, TrendingUp, FileText, Menu, X, UserRound, Clock, CheckCircle2, AlertCircle, Download, Filter, Plus, Eye, BookOpen, Target, XCircle} from 'lucide-react';
import {authAPI, studentsAPI, projectsAPI, drivesAPI, dashboardAPI, applicationsAPI, interviewsAPI, trainingAPI, projectUpdatesAPI, projectCommentsAPI} from './lib/api';
import './styles.css';

// Toast Notification System
const ToastContext = React.createContext();
function ToastProvider({children}){
 const [toasts,setToasts]=useState([]);
 const addToast=(message,type='success')=>{const id=Date.now();setToasts(prev=>[...prev,{id,message,type}]);setTimeout(()=>setToasts(prev=>prev.filter(t=>t.id!==id)),4000);};
 return <ToastContext.Provider value={{addToast}}>{children}<div className="toast-container">{toasts.map(t=><div key={t.id} className={`toast ${t.type}`}>{t.type==='success'?<CheckCircle2 size={18}/>:<XCircle size={18}/>}<span>{t.message}</span></div>)}</div></ToastContext.Provider>
}
const useToast=()=>React.useContext(ToastContext);

// Reusable Modal Component
function Modal({isOpen,onClose,title,children,size='medium'}){
 if(!isOpen)return null;
 return <div className="modal-overlay" onClick={onClose}><div className={`modal-content ${size}`} onClick={e=>e.stopPropagation()}><div className="modal-header"><h2>{title}</h2><button className="modal-close" onClick={onClose}><X size={20}/></button></div><div className="modal-body">{children}</div></div></div>
}

function App(){
 return <ToastProvider><BrowserRouter><Routes>
  <Route path="/" element={<Home/>}/><Route path="/login/:role" element={<Login/>}/>
  <Route path="/admin" element={<Protected role="admin"><Shell role="admin"><Dashboard/></Shell></Protected>}/>
  <Route path="/admin/students" element={<Protected role="admin"><Shell role="admin"><Students/></Shell></Protected>}/>
  <Route path="/admin/projects" element={<Protected role="admin"><Shell role="admin"><Projects/></Shell></Protected>}/>
  <Route path="/admin/drives" element={<Protected role="admin"><Shell role="admin"><Drives/></Shell></Protected>}/>
  <Route path="/admin/applications" element={<Protected role="admin"><Shell role="admin"><Applications/></Shell></Protected>}/>
  <Route path="/admin/reports" element={<Protected role="admin"><Shell role="admin"><Reports/></Shell></Protected>}/>
  <Route path="/admin/profile" element={<Protected role="admin"><Shell role="admin"><Profile/></Shell></Protected>}/>
  <Route path="/student" element={<Protected role="student"><Shell role="student"><StudentDashboard/></Shell></Protected>}/>
  <Route path="/student/drives" element={<Protected role="student"><Shell role="student"><StudentDrives/></Shell></Protected>}/>
  <Route path="/student/profile" element={<Protected role="student"><Shell role="student"><StudentProfile/></Shell></Protected>}/>
  <Route path="/student/projects" element={<Protected role="student"><Shell role="student"><StudentProjects/></Shell></Protected>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter></ToastProvider>
}

function Protected({role,children}){const user=JSON.parse(localStorage.getItem('ep_user')||'null'); return user?.role===role?children:<Navigate to={`/login/${role}`} replace/>}
function Home(){return <div className="landing"><header className="landing-nav"><div className="brand"><span className="brand-icon"><GraduationCap size={19}/></span><b>EduPlacement Pro</b></div><div className="landing-links"><a href="#features">Platform</a><a href="#roles">How it works</a><a href="#about">About</a></div><div className="nav-actions"><Link className="btn ghost" to="/login/student">Student Login</Link><Link className="btn primary" to="/login/admin">Admin Login <ArrowRight size={16}/></Link></div></header><section className="hero"><div className="hero-copy"><div className="eyebrow">INSTITUTIONAL PLACEMENT PLATFORM</div><h1>Bridge academic success with <span>career outcomes.</span></h1><p>One high-fidelity workspace for students, placement teams, projects, corporate drives, training and institutional analytics.</p><div className="hero-actions"><Link className="btn primary large" to="/login/student">Student Portal <ArrowRight size={17}/></Link><Link className="btn light large" to="/login/admin">Admin Portal</Link></div><div className="mini-stats"><div><b>12,500+</b><span>Students tracked</span></div><div><b>450+</b><span>Corporate partners</span></div><div><b>84.2%</b><span>Placement rate</span></div></div></div><div className="hero-card"><div className="mock-top"><span>EduPlacement Pro</span><span>Admin Overview</span></div><div className="mock-banner"><small>ACADEMIC SESSION 2024–25</small><h3>Central Intelligence Hub</h3><p>Placement operations, projects & student success.</p></div><div className="mock-grid"><Metric title="Total Students" value="2,482"/><Metric title="Active Projects" value="145"/><Metric title="Active Drives" value="18"/><Metric title="Avg. Package" value="$84.2k"/></div><div className="mock-chart"><div className="chart-title">Placement Trends</div><div className="bars"><i style={{height:'38%'}}/><i style={{height:'52%'}}/><i style={{height:'45%'}}/><i style={{height:'70%'}}/><i style={{height:'78%'}}/><i style={{height:'90%'}}/></div></div></div></section><section id="features" className="feature-section"><div className="section-heading"><div className="eyebrow">PLATFORM CAPABILITIES</div><h2>Everything your placement ecosystem needs.</h2></div><div className="feature-grid"><Feature icon={<Users/>} title="Student Management" text="Maintain student profiles, eligibility, training and placement status."/><Feature icon={<FolderKanban/>} title="Project Tracking" text="Monitor milestones, mentors, progress and academic health."/><Feature icon={<Building2/>} title="Placement Drives" text="Manage partner companies, openings, applicants and hiring stages."/><Feature icon={<BarChart3/>} title="Analytics & Reports" text="Turn placement and institutional activity into actionable insights."/><Feature icon={<ShieldCheck/>} title="Role-Based Access" text="Admins see institutional data while students see only their own records."/><Feature icon={<BookOpen/>} title="Training Hub" text="Keep interviews, courses, workshops and skill assessments in one place."/></div></section><section id="roles" className="role-section"><div className="role-card"><ShieldCheck size={24}/><h3>For administrators</h3><p>Operate the complete placement lifecycle with institution-wide visibility.</p><Link to="/login/admin">Enter Admin Portal <ArrowRight size={16}/></Link></div><div className="role-card"><GraduationCap size={24}/><h3>For students</h3><p>Track your applications, interviews, training and placement progress.</p><Link to="/login/student">Enter Student Portal <ArrowRight size={16}/></Link></div></section><footer>© 2026 EduPlacement Pro · Institutional placement intelligence</footer></div>}
function Metric({title,value}){return <div className="mock-metric"><span>{title}</span><b>{value}</b></div>}
function Feature({icon,title,text}){return <div className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>}

function Login(){const role=useLocation().pathname.split('/')[2]||'student'; const isAdmin=role==='admin'; const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const nav=useNavigate();
 const login=async(e)=>{e.preventDefault(); setLoading(true); setError(''); try{const response=await authAPI.login(email,password); const user={...response,role:response.role?.toLowerCase()||role}; if(user.role!==role){setError(`This account is not a ${role} account.`);setLoading(false);return;} localStorage.setItem('ep_user',JSON.stringify(user)); nav(isAdmin?'/admin':'/student');}catch(err){console.error('Login error:',err);setError(err.message||'Invalid credentials. Please check your email and password.');}finally{setLoading(false);}};
 
 useEffect(()=>{if(!isAdmin)return; const initializeGoogleSignIn=()=>{if(typeof window.google!=='undefined'&&window.google.accounts){window.google.accounts.id.initialize({client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,callback:handleGoogleCallback,auto_select:false}); window.google.accounts.id.renderButton(document.getElementById('googleSignInDiv'),{theme:'outline',size:'large',text:'continue_with',width:300});}else{setTimeout(initializeGoogleSignIn,500);}};const loadGoogleScript=()=>{if(document.getElementById('google-signin-script'))return;const script=document.createElement('script');script.src='https://accounts.google.com/gsi/client';script.id='google-signin-script';script.async=true;script.defer=true;script.onload=initializeGoogleSignIn;document.body.appendChild(script);};loadGoogleScript();},[isAdmin]);
 
 const handleGoogleCallback=async(response)=>{setLoading(true);setError('');try{const result=await authAPI.googleAuth(response.credential,'ADMIN');const user={...result,role:result.role?.toLowerCase()||'admin'};if(user.role!=='admin'){setError(`This Google account is registered as ${user.role}, not admin.`);setLoading(false);return;}localStorage.setItem('ep_user',JSON.stringify(user));nav('/admin');}catch(err){console.error('Google OAuth error:',err);setError(err.message||'Failed to complete Google sign-in. Make sure your Google Client ID is configured.');}finally{setLoading(false);}};
 
 return <div className="auth-page"><div className="auth-left"><div className="auth-brand"><span className="brand-icon"><GraduationCap size={19}/></span><b>EduPlacement Pro</b></div><div className="auth-copy"><div className="eyebrow">{isAdmin?'ADMIN PORTAL':'STUDENT PORTAL'}</div><h1>{isAdmin?'Manage the complete placement ecosystem.':'Your placement journey, in one place.'}</h1><p>{isAdmin?'Access institution-wide students, projects, drives, applications and analytics.':'Track your applications, interviews, training and placement readiness.'}</p><div className="auth-points"><span><CheckCircle2 size={17}/> Secure role-based access</span><span><CheckCircle2 size={17}/> Real-time placement updates</span><span><CheckCircle2 size={17}/> Clean, focused workspace</span></div></div></div><div className="auth-panel"><Link className="back-link" to="/">← Back to home</Link><div className="login-card"><div className="login-icon">{isAdmin?<ShieldCheck size={25}/>:<GraduationCap size={25}/>}</div><h2>Welcome back</h2><p>Sign in to your {isAdmin?'administrator':'student'} account.</p><form onSubmit={login}><label>Email address<div className="input"><Mail size={17}/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@institution.edu" required/></div></label><label>Password<div className="input"><Lock size={17}/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter your password" required/></div></label><div className="form-row"><label className="check"><input type="checkbox"/> Remember me</label><a href="#">Forgot password?</a></div>{error&&<div className="error">{error}</div>}<button className="btn primary full" type="submit" disabled={loading}>{loading?'Signing in...':'Sign in'} <ArrowRight size={16}/></button></form>{isAdmin&&<><div className="divider"><span>OR</span></div><div id="googleSignInDiv" style={{display:'flex',justifyContent:'center',margin:'0 auto'}}></div></>}<div className="demo">Demo: <b>{isAdmin?'admin@eduplacement.edu / admin123':'emma@eduplacement.edu / student123'}</b></div></div></div></div>}

function Shell({role,children}){const [open,setOpen]=useState(false); const nav=useNavigate(); const user=JSON.parse(localStorage.getItem('ep_user')||'{}'); const admin=role==='admin'; const logout=()=>{localStorage.removeItem('ep_user');nav('/')}; const links=admin?[['/admin','Dashboard',LayoutDashboard],['/admin/students','Students',Users],['/admin/projects','Projects',FolderKanban],['/admin/drives','Companies & Drives',Building2],['/admin/applications','Applications',BriefcaseBusiness],['/admin/reports','Reports',BarChart3]]:[['/student','Dashboard',LayoutDashboard],['/student/drives','Drives',Building2],['/student/projects','My Projects',FolderKanban],['/student/profile','My Profile',UserRound]]; const userInitial=(user.name||'A')[0].toUpperCase(); return <div className="app-shell"><aside className={open?'sidebar open':'sidebar'}><div className="side-brand"><span className="brand-icon"><GraduationCap size={18}/></span><b>EduPlacement Pro</b><button className="mobile-close" onClick={()=>setOpen(false)}><X/></button></div><div className="menu-label">MAIN MENU</div><nav>{links.map(([to,label,Icon])=><Link onClick={()=>setOpen(false)} className={location.pathname===to?'active':''} key={to} to={to}><Icon size={16}/><span>{label}</span></Link>)}</nav><div className="side-bottom"><Link to={admin?'/admin/profile':'/student/profile'}><Settings size={16}/>Settings</Link><a href="#"><HelpCircle size={16}/>Help</a><button onClick={logout}><LogOut size={16}/>Logout</button></div></aside><div className="main"><header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(true)}><Menu/></button><div className="crumb"><LayoutDashboard size={14}/> Dashboard <span>›</span> Overview</div><div className="top-actions"><div className="search"><Search size={15}/><input placeholder="Search students, projects..."/></div><Bell size={18}/><div className="user-menu">{user.picture?<img src={user.picture} alt={user.name} style={{width:'27px',height:'27px',borderRadius:'50%',objectFit:'cover'}}/>:<div className="avatar">{userInitial}</div>}<div><b>{user.name||'User'}</b><small>{admin?'Admin Portal':'Student Portal'}</small></div><ChevronDown size={15}/></div></div></header><main>{children}</main></div></div>}
function PageHero({eyebrow,title,text,buttons=[]}){return <div className="page-hero"><div><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p>{buttons.length>0&&<div className="hero-buttons">{buttons.map((b,i)=><button className={i===0?'btn white':'btn outline-white'} key={typeof b==='string'?b:b.label} onClick={typeof b==='object'?b.onClick:undefined}>{typeof b==='string'?b:b.label}</button>)}</div>}</div></div>}
function Stat({icon,title,value,change}){return <div className="stat"><div className="stat-icon">{icon}</div><div><small>{title}</small><strong>{value}</strong><em>{change}</em></div></div>}
function Dashboard(){const [stats,setStats]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const toast=useToast(); const nav=useNavigate();
 useEffect(()=>{const fetchData=async()=>{try{const data=await dashboardAPI.getAdminStats(); setStats(data);}catch(err){console.error('Failed to load dashboard:',err);setError(err.message);}finally{setLoading(false);}}; fetchData();},[]);
 
 const handleGenerateReport=()=>{toast.addToast('Generating annual report...','success'); setTimeout(()=>toast.addToast('Annual report ready for download!','success'),2000);};
 const handleViewDrives=()=>{nav('/admin/drives');};
 
 if(loading)return <div className="page"><div className="loading">Loading dashboard...</div></div>; if(error)return <div className="page"><div className="error">Error loading dashboard: {error}</div></div>;
 return <div className="page"><PageHero eyebrow="ACADEMIC SESSION 2024–25" title="EduPlacement Pro Central Intelligence Hub" text="Manage student pipelines, track faculty mentorship milestones, and orchestrate corporate recruitment drives from a single platform." buttons={[{label:'Generate Annual Report',onClick:handleGenerateReport},{label:'View Active Drives',onClick:handleViewDrives}]}/><div className="stats"><Stat icon={<Users/>} title="Total Students" value={stats?.totalStudents||'0'} change="+12% this month"/><Stat icon={<FolderKanban/>} title="Active Projects" value={stats?.activeProjects||'0'} change="+4.5%"/><Stat icon={<Building2/>} title="Ongoing Drives" value={stats?.activeDrives||'0'} change="Stable"/><Stat icon={<TrendingUp/>} title="Placement Rate" value={stats?.placementRate?`${stats.placementRate}%`:'0%'} change="+8%"/></div><div className="two-col"><Card title="Placement Trends" sub="Monthly placement volume comparison"><div className="fake-line"><span/><span/></div><div className="axis"><i>Jan</i><i>Feb</i><i>Mar</i><i>Apr</i><i>May</i><i>Jun</i></div></Card><Card title="Project Milestones" sub="Distribution of active projects by stage"><div className="hbars">{[['Planning','18%'],['Execution','54%'],['Testing','36%'],['Completed','82%']].map(x=><div key={x[0]}><span>{x[0]}</span><i style={{width:x[1]}}/></div>)}</div></Card></div><div className="two-col lower"><TableCard title="Recent Placement Drives" headers={['Company','Role','Applicants','Status']} rows={stats?.recentDrives?.map(d=>[d.companyName,d.role,d.applicantCount,d.status])||[]}/><Card title="High-Priority Projects" sub="Projects reaching critical milestones"><div className="priority-list">{(stats?.priorityProjects||[]).slice(0,3).map((p,i)=><div key={p.id}><div className="avatar">{p.title[0]}</div><div><b>{p.title}</b><small>Lead: {p.guide}</small><progress value={p.completionPercentage} max="100"/></div><span>{p.completionPercentage}%</span></div>)}</div></Card></div></div>}
function Card({title,sub,children}){return <section className="card"><div className="card-head"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div></div>{children}</section>}
function TableCard({title,headers,rows}){return <Card title={title}><div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{j===3?<Status text={c}/>:c}</td>)}</tr>)}</tbody></table></div></Card>}
function Status({text}){return <span className={'status '+text.toLowerCase().replaceAll(' ','-')}>{text}</span>}
function Students(){const [students,setStudents]=useState([]); const [stats,setStats]=useState(null); const [loading,setLoading]=useState(true); const [searchTerm,setSearchTerm]=useState(''); const [showEnrollModal,setShowEnrollModal]=useState(false); const toast=useToast();
 const [enrollForm,setEnrollForm]=useState({name:'',email:'',password:'',major:'',graduationYear:new Date().getFullYear()+4,gpa:'',phoneNumber:'',skills:''});
 
 useEffect(()=>{const fetchData=async()=>{try{const [studentsData,statsData]=await Promise.all([studentsAPI.getAll(),studentsAPI.getStats()]); setStudents(studentsData); setStats(statsData);}catch(err){console.error('Failed to load students:',err);}finally{setLoading(false);}}; fetchData();},[]);
 
 const handleSearch=async(e)=>{const term=e.target.value; setSearchTerm(term); if(term.trim()){try{const results=await studentsAPI.search(term); setStudents(results);}catch(err){console.error('Search failed:',err);}}else{const studentsData=await studentsAPI.getAll(); setStudents(studentsData);}};
 
 const handleEnrollSubmit=async(e)=>{e.preventDefault(); try{const newStudent=await studentsAPI.create(enrollForm); setStudents(prev=>[newStudent,...prev]); setShowEnrollModal(false); setEnrollForm({name:'',email:'',password:'',major:'',graduationYear:new Date().getFullYear()+4,gpa:'',phoneNumber:'',skills:''}); toast.addToast(`${newStudent.name} enrolled successfully!`,'success');}catch(err){console.error('Enrollment failed:',err);toast.addToast(err.message||'Failed to enroll student','error');}};
 
 if(loading)return <div className="page"><div className="loading">Loading students...</div></div>;
 return <div className="page"><div className="title-row"><div><h1>Students Management</h1><p>Monitor academic performance, placement eligibility, and profiles.</p></div><button className="btn primary" onClick={()=>setShowEnrollModal(true)}><Plus size={16}/> Enroll Student</button></div><div className="stats"><Stat icon={<Users/>} title="Total Students" value={stats?.totalStudents||students.length} change="+12% this month"/><Stat icon={<Target/>} title="Placement Ready" value={stats?.eligibleStudents||'0'} change="+5% vs last sem"/><Stat icon={<GraduationCap/>} title="Avg. Institution GPA" value={stats?.averageGPA?.toFixed(2)||'0.00'} change=""/><Stat icon={<CheckCircle2/>} title="Placed Students" value={stats?.placedStudents||'0'} change="+8% achievement"/></div><Card title="Student Directory" sub="Manage and filter through all enrolled student profiles."><div className="toolbar"><div className="search wide"><Search size={15}/><input value={searchTerm} onChange={handleSearch} placeholder="Search name, ID, email..."/></div><button className="icon-btn"><Filter size={16}/></button><button className="icon-btn"><Download size={16}/></button></div><div className="table-wrap"><table><thead><tr><th>Student</th><th>Major / Batch</th><th>GPA</th><th>Placement Status</th><th>Actions</th></tr></thead><tbody>{students.map(s=><tr key={s.id}><td><div className="person"><div className="avatar">{s.name[0]}</div><div><b>{s.name}</b><small>{s.email}</small></div></div></td><td><b>{s.major}</b><small>Class of {s.graduationYear}</small></td><td><b>{s.gpa}</b></td><td><Status text={s.placementStatus}/></td><td>•••</td></tr>)}</tbody></table></div></Card>
 <Modal isOpen={showEnrollModal} onClose={()=>setShowEnrollModal(false)} title="Enroll New Student"><form onSubmit={handleEnrollSubmit} className="modal-form"><div className="form-row-2"><label>Full Name<input required value={enrollForm.name} onChange={e=>setEnrollForm({...enrollForm,name:e.target.value})} placeholder="Enter student name"/></label><label>Email Address<input required type="email" value={enrollForm.email} onChange={e=>setEnrollForm({...enrollForm,email:e.target.value})} placeholder="student@eduplacement.edu"/></label></div><label>Password<input required type="password" value={enrollForm.password} onChange={e=>setEnrollForm({...enrollForm,password:e.target.value})} placeholder="Create password for student"/></label><div className="form-row-2"><label>Major<input required value={enrollForm.major} onChange={e=>setEnrollForm({...enrollForm,major:e.target.value})} placeholder="e.g., Computer Science"/></label><label>Graduation Year<input required type="number" value={enrollForm.graduationYear} onChange={e=>setEnrollForm({...enrollForm,graduationYear:parseInt(e.target.value)})} min={new Date().getFullYear()} max={new Date().getFullYear()+10}/></label></div><div className="form-row-2"><label>GPA<input required type="number" step="0.01" min="0" max="4" value={enrollForm.gpa} onChange={e=>setEnrollForm({...enrollForm,gpa:e.target.value})} placeholder="0.00"/></label><label>Phone Number<input type="tel" value={enrollForm.phoneNumber} onChange={e=>setEnrollForm({...enrollForm,phoneNumber:e.target.value})} placeholder="+1 (555) 000-0000"/></label></div><label>Skills (comma-separated)<input value={enrollForm.skills} onChange={e=>setEnrollForm({...enrollForm,skills:e.target.value})} placeholder="Java, Python, React..."/></label><div className="modal-actions"><button type="button" className="btn outline" onClick={()=>setShowEnrollModal(false)}>Cancel</button><button type="submit" className="btn primary">Enroll Student</button></div></form></Modal></div>}
function Projects(){
  const [projects,setProjects]=useState([]);
  const [stats,setStats]=useState(null);
  const [loading,setLoading]=useState(true);
  const [showProjectModal,setShowProjectModal]=useState(false);
  const [showDetailModal,setShowDetailModal]=useState(false);
  const [selectedProject,setSelectedProject]=useState(null);
  const [updates,setUpdates]=useState([]);
  const [comments,setComments]=useState([]);
  const [detailLoading,setDetailLoading]=useState(false);
  const [commentText,setCommentText]=useState('');
  const [commentLoading,setCommentLoading]=useState(false);
  const [projectForm,setProjectForm]=useState({title:'',description:'',studentEmail:'',guide:'',completionPercentage:0,status:'ON_TRACK'});
  const toast=useToast();

  const loadProjects=async()=>{
    try{
      const [projectsData,statsData]=await Promise.all([projectsAPI.getAll(),projectsAPI.getStats()]);
      setProjects(projectsData); setStats(statsData);
    }catch(err){console.error('Failed to load projects:',err);}
    finally{setLoading(false);}
  };

  useEffect(()=>{loadProjects();},[]);

  const handleProjectSubmit=async(e)=>{
    e.preventDefault();
    try{
      await projectsAPI.create(projectForm);
      await loadProjects();
      setShowProjectModal(false);
      setProjectForm({title:'',description:'',studentEmail:'',guide:'',completionPercentage:0,status:'ON_TRACK'});
      toast.addToast('Project created successfully!','success');
    }catch(err){toast.addToast(err.message||'Failed to create project','error');}
  };

  const openDetail=async(project)=>{
    setSelectedProject(project); setShowDetailModal(true);
    setDetailLoading(true); setUpdates([]); setComments([]);
    try{
      const [u,c]=await Promise.all([
        projectUpdatesAPI.getByProject(project.id),
        projectCommentsAPI.getByProject(project.id)
      ]);
      setUpdates(u); setComments(c);
    }catch(err){console.error('Failed to load project details:',err);}
    finally{setDetailLoading(false);}
  };

  const handleAddComment=async(e)=>{
    e.preventDefault();
    if(!commentText.trim())return;
    setCommentLoading(true);
    try{
      await projectCommentsAPI.create({projectId:selectedProject.id,commentText});
      const [u,c]=await Promise.all([
        projectUpdatesAPI.getByProject(selectedProject.id),
        projectCommentsAPI.getByProject(selectedProject.id)
      ]);
      setUpdates(u); setComments(c); setCommentText('');
      toast.addToast('Comment posted!','success');
    }catch(err){toast.addToast(err.message||'Failed to post comment','error');}
    finally{setCommentLoading(false);}
  };

  const handleDeleteComment=async(commentId)=>{
    try{
      await projectCommentsAPI.delete(commentId);
      const c=await projectCommentsAPI.getByProject(selectedProject.id);
      setComments(c);
      toast.addToast('Comment deleted','success');
    }catch(err){toast.addToast('Failed to delete comment','error');}
  };

  const fmtDate=(s)=>{
    if(!s)return '';
    const d=new Date(s),now=new Date(),diff=Math.floor((now-d)/1000);
    if(diff<60)return 'just now';
    if(diff<3600)return Math.floor(diff/60)+'m ago';
    if(diff<86400)return Math.floor(diff/3600)+'h ago';
    if(diff<604800)return Math.floor(diff/86400)+'d ago';
    return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  };

  const updateIcon=(t)=>({MILESTONE:'🎯',ISSUE:'⚠️',COMPLETION:'🎉'}[t]||'📝');

  const timeline=[
    ...updates.map(u=>({...u,_type:'update'})),
    ...comments.map(c=>({...c,_type:'comment'}))
  ].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));

  if(loading)return <div className="page"><div className="loading">Loading projects...</div></div>;

  return <div className="page">
    <PageHero eyebrow="ACADEMIC YEAR 2024–25" title="Projects Management" text="Oversee academic excellence through detailed project tracking, mentor pairing and milestone management." buttons={[{label:'+ New Project',onClick:()=>setShowProjectModal(true)},{label:'Generate Report',onClick:async()=>{
      try{
        const rows=[['Project Code','Title','Student','Student Email','Mentor/Guide','Progress %','Status','Start Date','Technologies'],...projects.map(p=>[p.projectCode,p.title,p.studentName||'',p.studentEmail||'',p.mentorName||'',p.progressPercentage||0,p.status,p.startDate?new Date(p.startDate).toLocaleDateString():'',p.technologies||''])];
        const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob=new Blob([csv],{type:'text/csv'});
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url;
        a.download=`projects-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.addToast(`Projects report exported (${projects.length} projects)`,'success');
      }catch(e){toast.addToast('Failed to generate report','error');}
    }}]}/>

    <div className="stats">
      <Stat icon={<FolderKanban/>} title="Total Projects" value={stats?.totalProjects||projects.length} change="+12% vs last semester"/>
      <Stat icon={<Users/>} title="Active Mentors" value={stats?.activeMentors||'0'} change=""/>
      <Stat icon={<TrendingUp/>} title="On-track Ratio" value={stats?.onTrackPercentage!=null?`${stats.onTrackPercentage}%`:'0%'} change="Healthy"/>
      <Stat icon={<AlertCircle/>} title="Completed" value={stats?.completedProjects||'0'} change=""/>
    </div>

    <Card title="All Projects" sub="Click 'View' on any row to open the project timeline and add feedback.">
      <div className="table-wrap"><table>
        <thead><tr><th>Project</th><th>Student</th><th>Mentor / Guide</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {projects.length===0
            ?<tr><td colSpan="6" style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>No projects yet. Create one with "+ New Project".</td></tr>
            :projects.map(p=><tr key={p.id}>
              <td><div><b>{p.title}</b><small style={{display:'block',color:'#9ca3af',fontSize:'11px',fontFamily:'monospace'}}>{p.projectCode}</small></div></td>
              <td><div className="person"><div className="avatar">{(p.studentName||'?')[0]}</div><div><b>{p.studentName||'—'}</b><small>{p.studentEmail||''}</small></div></div></td>
              <td>{p.mentorName}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:'8px'}}><div className="prog-bar"><div className="prog-fill" style={{width:`${p.progressPercentage||0}%`}}/></div><span style={{fontSize:'13px',fontWeight:600,minWidth:'32px'}}>{p.progressPercentage||0}%</span></div></td>
              <td><Status text={p.status}/></td>
              <td><button className="btn outline" style={{padding:'5px 14px',fontSize:'13px'}} onClick={()=>openDetail(p)}>View</button></td>
            </tr>)
          }
        </tbody>
      </table></div>
    </Card>

    <div className="two-col">
      <Card title="Project Status Distribution">
        <div className="workload">{['ON_TRACK','COMPLETED','DELAYED','AT_RISK'].map(status=>{
          const count=projects.filter(p=>p.status===status).length;
          const pct=projects.length?Math.round((count/projects.length)*100):0;
          return <div key={status}><span>{status.replace(/_/g,' ')}</span><small>{count} project{count!==1?'s':''}</small><i><b style={{width:pct+'%'}}/></i></div>;
        })}</div>
      </Card>
      <Card title="Recent Activity">
        <div className="timeline">
          {projects.filter(p=>p.status==='ON_TRACK').slice(0,4).map(p=>(
            <div key={p.id} style={{cursor:'pointer'}} onClick={()=>openDetail(p)}>
              <Clock size={15}/>
              <span>{p.title}<small>{p.progressPercentage||0}% complete · Click to view timeline</small></span>
            </div>
          ))}
          {projects.filter(p=>p.status==='ON_TRACK').length===0&&<p style={{color:'#9ca3af',padding:'16px 0',textAlign:'center',fontSize:'14px'}}>No active projects</p>}
        </div>
      </Card>
    </div>

    {/* ── Create Project Modal ── */}
    <Modal isOpen={showProjectModal} onClose={()=>setShowProjectModal(false)} title="Create New Project">
      <form onSubmit={handleProjectSubmit} className="modal-form">
        <label>Project Title<input required value={projectForm.title} onChange={e=>setProjectForm({...projectForm,title:e.target.value})} placeholder="e.g., AI-Driven Healthcare Diagnostic Tool"/></label>
        <label>Description<textarea required value={projectForm.description} onChange={e=>setProjectForm({...projectForm,description:e.target.value})} placeholder="Describe the project objectives and scope" rows="3"/></label>
        <div className="form-row-2">
          <label>Student Email<input required type="email" value={projectForm.studentEmail} onChange={e=>setProjectForm({...projectForm,studentEmail:e.target.value})} placeholder="student@eduplacement.edu"/></label>
          <label>Faculty Guide<input required value={projectForm.guide} onChange={e=>setProjectForm({...projectForm,guide:e.target.value})} placeholder="Dr. Name"/></label>
        </div>
        <div className="form-row-2">
          <label>Status<select value={projectForm.status} onChange={e=>setProjectForm({...projectForm,status:e.target.value})}><option value="ON_TRACK">On Track</option><option value="DELAYED">Delayed</option><option value="AT_RISK">At Risk</option><option value="COMPLETED">Completed</option></select></label>
          <label>Initial Progress %<input type="number" min="0" max="100" value={projectForm.completionPercentage} onChange={e=>setProjectForm({...projectForm,completionPercentage:parseInt(e.target.value)||0})} placeholder="0"/></label>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn outline" onClick={()=>setShowProjectModal(false)}>Cancel</button>
          <button type="submit" className="btn primary">Create Project</button>
        </div>
      </form>
    </Modal>

    {/* ── Project Detail Modal ── */}
    <Modal isOpen={showDetailModal} onClose={()=>{setShowDetailModal(false);setSelectedProject(null);setCommentText('');}} title={selectedProject?.title||'Project Details'} size="large">
      {selectedProject&&<div className="proj-detail">
        <div className="proj-meta-grid">
          <div className="proj-meta-item"><label>Student</label><span>{selectedProject.studentName||'—'}</span></div>
          <div className="proj-meta-item"><label>Mentor</label><span>{selectedProject.mentorName}</span></div>
          <div className="proj-meta-item"><label>Status</label><Status text={selectedProject.status}/></div>
          <div className="proj-meta-item"><label>Progress</label>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div className="prog-bar" style={{width:'100px'}}><div className="prog-fill" style={{width:`${selectedProject.progressPercentage||0}%`}}/></div>
              <span style={{fontWeight:700}}>{selectedProject.progressPercentage||0}%</span>
            </div>
          </div>
        </div>
        {selectedProject.description&&<div className="proj-desc"><p>{selectedProject.description}</p></div>}

        <div className="proj-timeline-section">
          <h3 style={{fontSize:'15px',marginBottom:'14px'}}>
            Activity Timeline&nbsp;<span style={{fontWeight:400,color:'#9ca3af',fontSize:'13px'}}>({updates.length} updates · {comments.length} comments)</span>
          </h3>
          {detailLoading
            ?<div style={{textAlign:'center',padding:'32px',color:'#9ca3af'}}>Loading timeline…</div>
            :<div className="proj-timeline-feed">
              {timeline.length===0&&<div className="proj-empty-timeline">No activity yet. Add the first comment below!</div>}
              {timeline.map(item=>item._type==='update'
                ?<div key={'u'+item.id} className="proj-timeline-entry proj-update-entry">
                  <div className="proj-entry-icon">{updateIcon(item.updateType)}</div>
                  <div className="proj-entry-body">
                    <div className="proj-entry-header">
                      <strong>{item.postedByName}</strong>
                      <span className="proj-badge proj-badge-update">{item.updateType}</span>
                      <span className="proj-entry-time">{fmtDate(item.createdAt)}</span>
                    </div>
                    <p>{item.updateText}</p>
                    {item.progressPercentage!=null&&<div className="proj-progress-note">Progress updated to {item.progressPercentage}%</div>}
                  </div>
                </div>
                :<div key={'c'+item.id} className="proj-timeline-entry proj-comment-entry">
                  <div className="proj-entry-icon">💬</div>
                  <div className="proj-entry-body">
                    <div className="proj-entry-header">
                      <strong>{item.commentedByName}</strong>
                      <span className={`proj-badge proj-badge-${(item.commentedByRole||'').toLowerCase()}`}>{item.commentedByRole}</span>
                      <span className="proj-entry-time">{fmtDate(item.createdAt)}</span>
                      <button className="proj-delete-btn" onClick={()=>handleDeleteComment(item.id)} title="Delete">×</button>
                    </div>
                    <p>{item.commentText}</p>
                  </div>
                </div>
              )}
            </div>
          }
        </div>

        <form onSubmit={handleAddComment} className="proj-comment-form">
          <label style={{fontWeight:600,marginBottom:'8px',display:'block'}}>Add Comment / Feedback</label>
          <textarea value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Provide guidance, feedback, or ask the student a question…" rows="3" required style={{width:'100%',padding:'12px',border:'1px solid #d1d5db',borderRadius:'8px',fontFamily:'inherit',fontSize:'14px',resize:'vertical',boxSizing:'border-box'}}/>
          <button type="submit" className="btn primary" disabled={commentLoading} style={{marginTop:'10px'}}>{commentLoading?'Posting…':'Post Comment'}</button>
        </form>
      </div>}
    </Modal>
  </div>
}
function Drives() {
  const [drives, setDrives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const toast = useToast();
  
  const [driveForm, setDriveForm] = useState({
    companyName: '',
    roleTitle: '',
    description: '',
    requiredSkills: '',
    minGpa: '',
    packageMin: '',
    packageMax: '',
    applicationDeadline: '',
    driveDate: '',
    eligibleBatches: '',
    eligibleMajors: '',
    status: 'UPCOMING'
  });

  const [companyForm, setCompanyForm] = useState({
    name: '',
    description: '',
    industry: '',
    website: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [drivesData, statsData] = await Promise.all([
        drivesAPI.getAll(),
        drivesAPI.getStats()
      ]);
      setDrives(drivesData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load drives:', err);
      toast.addToast('Failed to load drives data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDriveSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        company: { name: driveForm.companyName.trim() },
        roleTitle: driveForm.roleTitle,
        description: driveForm.description,
        requiredSkills: driveForm.requiredSkills,
        minGpa: driveForm.minGpa ? parseFloat(driveForm.minGpa) : null,
        packageMin: driveForm.packageMin ? parseFloat(driveForm.packageMin) : null,
        packageMax: driveForm.packageMax ? parseFloat(driveForm.packageMax) : null,
        applicationDeadline: driveForm.applicationDeadline,
        driveDate: driveForm.driveDate,
        eligibleBatches: driveForm.eligibleBatches,
        eligibleMajors: driveForm.eligibleMajors,
        status: driveForm.status
      };

      if (editMode && selectedDrive) {
        await drivesAPI.update(selectedDrive.id, payload);
        toast.addToast('Drive updated successfully!', 'success');
      } else {
        await drivesAPI.create(payload);
        toast.addToast('Drive created successfully!', 'success');
      }

      await loadData();
      setShowDriveModal(false);
      resetDriveForm();
    } catch (err) {
      console.error('Drive operation failed:', err);
      toast.addToast(err.message || 'Failed to save drive', 'error');
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    try {
      const newCompany = await companiesAPI.create(companyForm);
      setCompanies(prev => [newCompany, ...prev]);
      setDriveForm({ ...driveForm, company: { id: newCompany.id } });
      setShowCompanyModal(false);
      setCompanyForm({ name: '', description: '', industry: '', website: '', contactPerson: '', contactEmail: '', contactPhone: '' });
      toast.addToast(`Company ${newCompany.name} added!`, 'success');
    } catch (err) {
      console.error('Company creation failed:', err);
      toast.addToast(err.message || 'Failed to create company', 'error');
    }
  };

  const openDriveDetail = async (drive) => {
    setSelectedDrive(drive);
    setShowDetailModal(true);
    setApplicantsLoading(true);
    setApplicants([]);
    try {
      const apps = await applicationsAPI.getByDrive(drive.id);
      setApplicants(apps);
    } catch (err) {
      console.error('Failed to load applicants:', err);
      toast.addToast('Failed to load applicants', 'error');
    } finally {
      setApplicantsLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationsAPI.updateStatus(applicationId, newStatus);
      const updatedApps = await applicationsAPI.getByDrive(selectedDrive.id);
      setApplicants(updatedApps);
      toast.addToast('Application status updated!', 'success');
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.addToast('Failed to update status', 'error');
    }
  };

  const handleEditDrive = (drive) => {
    setEditMode(true);
    setSelectedDrive(drive);
    setDriveForm({
      companyName: drive.companyName || '',
      roleTitle: drive.roleTitle || '',
      description: drive.description || '',
      requiredSkills: drive.requiredSkills || '',
      minGpa: drive.minGpa || '',
      packageMin: drive.packageMin || '',
      packageMax: drive.packageMax || '',
      applicationDeadline: drive.applicationDeadline || '',
      driveDate: drive.driveDate || '',
      eligibleBatches: drive.eligibleBatches || '',
      eligibleMajors: drive.eligibleMajors || '',
      status: drive.status || 'UPCOMING'
    });
    setShowDriveModal(true);
  };

  const handleDeleteDrive = async (driveId, driveName) => {
    if (!confirm(`Are you sure you want to delete the drive "${driveName}"? This action cannot be undone.`)) return;
    try {
      await drivesAPI.delete(driveId);
      await loadData();
      toast.addToast('Drive deleted successfully', 'success');
    } catch (err) {
      console.error('Failed to delete drive:', err);
      toast.addToast('Failed to delete drive', 'error');
    }
  };

  const resetDriveForm = () => {
    setEditMode(false);
    setSelectedDrive(null);
    setDriveForm({
      companyName: '',
      roleTitle: '',
      description: '',
      requiredSkills: '',
      minGpa: '',
      packageMin: '',
      packageMax: '',
      applicationDeadline: '',
      driveDate: '',
      eligibleBatches: '',
      eligibleMajors: '',
      status: 'UPCOMING'
    });
  };

  const handleExport = () => {
    const csvData = 'Company,Role,Min Package,Max Package,Status,Deadline,Applicants\n' +
      drives.map(d => `"${d.companyName}","${d.roleTitle}",${d.packageMin || 0},${d.packageMax || 0},"${d.status}",${d.applicationDeadline || 'N/A'},${d.totalApplicants || 0}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placement-drives-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.addToast('Export completed successfully!', 'success');
  };

  if (loading) return <div className="page"><div className="loading">Loading drives...</div></div>;

  return <div className="page">
    <PageHero 
      eyebrow="CORPORATE RELATIONS" 
      title="Companies & Placement Drives" 
      text="Manage institutional partnerships and track recruitment cycles with real-time hiring analytics." 
      buttons={[
        { label: 'Schedule New Drive', onClick: () => { resetDriveForm(); setShowDriveModal(true); } },
        { label: 'Export Report', onClick: handleExport }
      ]} 
    />
    
    <div className="stats">
      <Stat icon={<Building2 />} title="Total Drives" value={stats?.totalDrives || drives.length} change="+12% YoY" />
      <Stat icon={<CalendarDays />} title="Active Drives" value={stats?.activeDrives || '0'} change="" />
      <Stat icon={<Users />} title="Total Applications" value={stats?.totalApplications || '0'} change="" />
      <Stat icon={<TrendingUp />} title="Avg. Package" value={stats?.averagePackage ? `$${Math.round(stats.averagePackage)}k` : '—'} change="" />
    </div>

    <Card title="Drive Monitoring" sub="Click 'View' to see applicants and manage their status.">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role / Position</th>
              <th>Package Range</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Applicants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No drives yet. Schedule one with "Schedule New Drive".</td></tr>
            ) : (
              drives.map(d => (
                <tr key={d.id}>
                  <td><b>{d.companyName}</b></td>
                  <td>{d.roleTitle}</td>
                  <td>{d.packageMin && d.packageMax ? `$${d.packageMin}k - $${d.packageMax}k` : '—'}</td>
                  <td><Status text={d.status} /></td>
                  <td>{d.applicationDeadline ? new Date(d.applicationDeadline).toLocaleDateString() : '—'}</td>
                  <td><span style={{ fontWeight: 600 }}>{d.totalApplicants || 0}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn outline" style={{ padding: '5px 12px', fontSize: '13px' }} onClick={() => openDriveDetail(d)}>View</button>
                      <button className="btn outline" style={{ padding: '5px 12px', fontSize: '13px' }} onClick={() => handleEditDrive(d)}>Edit</button>
                      <button className="btn outline" style={{ padding: '5px 12px', fontSize: '13px', color: '#ef4444' }} onClick={() => handleDeleteDrive(d.id, `${d.companyName} - ${d.roleTitle}`)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>

    <Modal isOpen={showDriveModal} onClose={() => { setShowDriveModal(false); resetDriveForm(); }} title={editMode ? "Edit Placement Drive" : "Schedule New Placement Drive"} size="large">
      <form onSubmit={handleDriveSubmit} className="modal-form">
        <div className="form-row-2">
          <label>
            Company Name
            <input required value={driveForm.companyName} onChange={e => setDriveForm({ ...driveForm, companyName: e.target.value })} placeholder="e.g., Google, Microsoft, TCS" />
          </label>
          <label>Role / Position<input required value={driveForm.roleTitle} onChange={e => setDriveForm({ ...driveForm, roleTitle: e.target.value })} placeholder="e.g., Software Engineer" /></label>
        </div>
        
        <label>Job Description<textarea required value={driveForm.description} onChange={e => setDriveForm({ ...driveForm, description: e.target.value })} placeholder="Describe the role and responsibilities" rows="3" /></label>
        
        <label>Required Skills<textarea value={driveForm.requiredSkills} onChange={e => setDriveForm({ ...driveForm, requiredSkills: e.target.value })} placeholder="Java, Python, React, etc." rows="2" /></label>
        
        <div className="form-row-3">
          <label>Min Package ($k)<input type="number" min="0" step="0.01" value={driveForm.packageMin} onChange={e => setDriveForm({ ...driveForm, packageMin: e.target.value })} placeholder="80" /></label>
          <label>Max Package ($k)<input type="number" min="0" step="0.01" value={driveForm.packageMax} onChange={e => setDriveForm({ ...driveForm, packageMax: e.target.value })} placeholder="120" /></label>
          <label>Min GPA<input type="number" min="0" max="4" step="0.01" value={driveForm.minGpa} onChange={e => setDriveForm({ ...driveForm, minGpa: e.target.value })} placeholder="3.0" /></label>
        </div>
        
        <div className="form-row-2">
          <label>Application Deadline<input type="date" value={driveForm.applicationDeadline} onChange={e => setDriveForm({ ...driveForm, applicationDeadline: e.target.value })} /></label>
          <label>Drive Date<input type="date" value={driveForm.driveDate} onChange={e => setDriveForm({ ...driveForm, driveDate: e.target.value })} /></label>
        </div>
        
        <div className="form-row-2">
          <label>Eligible Batches<input value={driveForm.eligibleBatches} onChange={e => setDriveForm({ ...driveForm, eligibleBatches: e.target.value })} placeholder="2024, 2025" /></label>
          <label>Eligible Majors<input value={driveForm.eligibleMajors} onChange={e => setDriveForm({ ...driveForm, eligibleMajors: e.target.value })} placeholder="CS, IT, ECE" /></label>
        </div>
        
        <label>Status<select value={driveForm.status} onChange={e => setDriveForm({ ...driveForm, status: e.target.value })}><option value="UPCOMING">Upcoming</option><option value="ONGOING">Ongoing</option><option value="SHORTLISTING">Shortlisting</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></select></label>
        
        <div className="modal-actions">
          <button type="button" className="btn outline" onClick={() => { setShowDriveModal(false); resetDriveForm(); }}>Cancel</button>
          <button type="submit" className="btn primary">{editMode ? 'Update Drive' : 'Schedule Drive'}</button>
        </div>
      </form>
    </Modal>

    <Modal isOpen={showCompanyModal} onClose={() => setShowCompanyModal(false)} title="Add New Company">
      <form onSubmit={handleCompanySubmit} className="modal-form">
        <label>Company Name<input required value={companyForm.name} onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })} placeholder="Enter company name" /></label>
        <label>Industry<input value={companyForm.industry} onChange={e => setCompanyForm({ ...companyForm, industry: e.target.value })} placeholder="e.g., Technology, Finance" /></label>
        <label>Website<input type="url" value={companyForm.website} onChange={e => setCompanyForm({ ...companyForm, website: e.target.value })} placeholder="https://company.com" /></label>
        <label>Description<textarea value={companyForm.description} onChange={e => setCompanyForm({ ...companyForm, description: e.target.value })} placeholder="Brief description about the company" rows="2" /></label>
        <div className="form-row-2">
          <label>Contact Person<input value={companyForm.contactPerson} onChange={e => setCompanyForm({ ...companyForm, contactPerson: e.target.value })} placeholder="HR Manager Name" /></label>
          <label>Contact Email<input type="email" value={companyForm.contactEmail} onChange={e => setCompanyForm({ ...companyForm, contactEmail: e.target.value })} placeholder="hr@company.com" /></label>
        </div>
        <label>Contact Phone<input type="tel" value={companyForm.contactPhone} onChange={e => setCompanyForm({ ...companyForm, contactPhone: e.target.value })} placeholder="+1 (555) 000-0000" /></label>
        <div className="modal-actions">
          <button type="button" className="btn outline" onClick={() => setShowCompanyModal(false)}>Cancel</button>
          <button type="submit" className="btn primary">Add Company</button>
        </div>
      </form>
    </Modal>

    <Modal isOpen={showDetailModal} onClose={() => { setShowDetailModal(false); setSelectedDrive(null); }} title={selectedDrive ? `${selectedDrive.companyName} - ${selectedDrive.roleTitle}` : 'Drive Details'} size="large">
      {selectedDrive && <div className="drive-detail">
        <div className="proj-meta-grid">
          <div className="proj-meta-item"><label>Company</label><span>{selectedDrive.companyName}</span></div>
          <div className="proj-meta-item"><label>Package Range</label><span>{selectedDrive.packageMin && selectedDrive.packageMax ? `$${selectedDrive.packageMin}k - $${selectedDrive.packageMax}k` : '—'}</span></div>
          <div className="proj-meta-item"><label>Status</label><Status text={selectedDrive.status} /></div>
          <div className="proj-meta-item"><label>Deadline</label><span>{selectedDrive.applicationDeadline ? new Date(selectedDrive.applicationDeadline).toLocaleDateString() : '—'}</span></div>
        </div>
        
        {selectedDrive.description && <div className="proj-desc"><p>{selectedDrive.description}</p></div>}
        
        {selectedDrive.requiredSkills && <div style={{ marginBottom: '20px' }}><label style={{ fontWeight: 600, fontSize: '13px', color: '#6b7280' }}>Required Skills:</label><p style={{ marginTop: '4px' }}>{selectedDrive.requiredSkills}</p></div>}

        <div className="proj-timeline-section">
          <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>
            Applicants <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '13px' }}>({applicants.length} total)</span>
          </h3>
          
          {applicantsLoading ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>Loading applicants…</div>
          ) : applicants.length === 0 ? (
            <div className="proj-empty-timeline">No applications yet for this drive.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Major</th>
                    <th>GPA</th>
                    <th>Status</th>
                    <th>Applied</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map(app => (
                    <tr key={app.id}>
                      <td>
                        <div className="person">
                          <div className="avatar">{(app.studentName || '?')[0]}</div>
                          <div>
                            <b>{app.studentName || '—'}</b>
                            <small>{app.studentEmail || ''}</small>
                          </div>
                        </div>
                      </td>
                      <td>{app.studentMajor || '—'}</td>
                      <td><b>{app.studentGpa?.toFixed(2) || '—'}</b></td>
                      <td><Status text={app.status} /></td>
                      <td>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <select 
                          value={app.status} 
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '13px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        >
                          <option value="APPLIED">Applied</option>
                          <option value="SCREENING">Screening</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                          <option value="INTERVIEW_COMPLETED">Interview Completed</option>
                          <option value="SELECTED">Selected</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>}
    </Modal>
  </div>;
}
function Applications(){const [applications,setApplications]=useState([]); const [interviews,setInterviews]=useState([]); const [trainings,setTrainings]=useState([]); const [loading,setLoading]=useState(true); useEffect(()=>{const fetchData=async()=>{try{const [appsData,interviewsData,trainingsData]=await Promise.all([applicationsAPI.getAll(),interviewsAPI.getUpcoming(),trainingAPI.getAll()]); setApplications(appsData); setInterviews(interviewsData); setTrainings(trainingsData);}catch(err){console.error('Failed to load applications:',err);}finally{setLoading(false);}}; fetchData();},[]);
 if(loading)return <div className="page"><div className="loading">Loading applications...</div></div>;
 return <div className="page"><PageHero eyebrow="PLACEMENT OPERATIONS" title="Applications & Training" text="Track corporate applications and ongoing professional development programs in real-time."/><div className="stats"><Stat icon={<BriefcaseBusiness/>} title="Active Applications" value={applications.filter(a=>a.status!=='REJECTED'&&a.status!=='SELECTED').length} change=""/><Stat icon={<Clock/>} title="Scheduled Interviews" value={interviews.length} change=""/><Stat icon={<BookOpen/>} title="Training Programs" value={trainings.length} change=""/><Stat icon={<CheckCircle2/>} title="Selected" value={applications.filter(a=>a.status==='SELECTED').length} change=""/></div><div className="two-col"><TableCard title="Recruitment Funnel" headers={['Student','Company & Role','Status']} rows={applications.slice(0,10).map(a=>[a.studentName,`${a.companyName} - ${a.roleTitle}`,a.status])}/><Card title="Active Training"><div className="training-list">{trainings.slice(0,4).map(t=><div key={t.id} className="training-item"><h4>{t.name}</h4><p>{t.description}</p><small>{new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}</small></div>)}</div></Card></div></div>}
function Reports() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [students, projects, drives, applications] = await Promise.all([
          studentsAPI.getAll().catch(() => []),
          projectsAPI.getAll().catch(() => []),
          drivesAPI.getAll().catch(() => []),
          applicationsAPI.getAll().catch(() => [])
        ]);
        setData({ students, projects, drives, applications });
      } catch (err) {
        console.error('Failed to load reports data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleExportCSV = async () => {
    try {
      const students = await studentsAPI.getAll();
      const csvData = 'Name,Email,Major,GPA,Batch,Placement Status\n' +
        students.map(s => `"${s.name}","${s.email}","${s.major}",${s.gpa},"${s.batch || ''}","${s.placementStatus}"`).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.addToast('CSV export completed successfully!', 'success');
    } catch (err) {
      toast.addToast('Failed to export data', 'error');
    }
  };

  const handleGenerateReport = async () => {
    toast.addToast('Fetching data for comprehensive report…', 'success');
    try {
      const [students, projects, drives] = await Promise.all([
        studentsAPI.getAll().catch(() => []),
        projectsAPI.getAll().catch(() => []),
        drivesAPI.getAll().catch(() => [])
      ]);
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const placed = students.filter(s => s.placementStatus === 'PLACED').length;
      const eligible = students.filter(s => s.placementStatus === 'ELIGIBLE').length;
      const inProcess = students.filter(s => s.placementStatus === 'IN_PROCESS').length;
      const avgGpa = students.length ? (students.reduce((a, s) => a + (parseFloat(s.gpa) || 0), 0) / students.length).toFixed(2) : 0;
      const onTrack = projects.filter(p => p.status === 'ON_TRACK').length;
      const completed = projects.filter(p => p.status === 'COMPLETED').length;
      const avgProgress = projects.length ? (projects.reduce((a, p) => a + (p.progressPercentage || 0), 0) / projects.length).toFixed(1) : 0;
      const activeDrives = drives.filter(d => d.status === 'ONGOING' || d.status === 'UPCOMING').length;

      const sections = [
        ['EDUPLACEMENT PRO — COMPREHENSIVE INSTITUTIONAL REPORT'],
        [`Generated on: ${today}`],
        [''],
        ['=== EXECUTIVE SUMMARY ==='],
        ['Metric', 'Value'],
        ['Total Students', students.length],
        ['Placed Students', placed],
        ['Placement Rate %', students.length ? ((placed / students.length) * 100).toFixed(1) + '%' : '0%'],
        ['Eligible for Placement', eligible],
        ['In Process', inProcess],
        ['Average GPA', avgGpa],
        ['Total Projects', projects.length],
        ['On-Track Projects', onTrack],
        ['Completed Projects', completed],
        ['Average Project Progress', avgProgress + '%'],
        ['Total Drives', drives.length],
        ['Active / Upcoming Drives', activeDrives],
        [''],
        ['=== STUDENT DETAILS ==='],
        ['Name', 'Email', 'Major', 'Batch', 'GPA', 'Placement Status', 'Contact'],
        ...students.map(s => [s.name, s.email, s.major, s.batch || '', s.gpa, s.placementStatus, s.contactNumber || '']),
        [''],
        ['=== PROJECT DETAILS ==='],
        ['Code', 'Title', 'Student', 'Student Email', 'Mentor', 'Progress %', 'Status'],
        ...projects.map(p => [p.projectCode, p.title, p.studentName || '', p.studentEmail || '', p.mentorName || '', p.progressPercentage || 0, p.status]),
        [''],
        ['=== PLACEMENT DRIVES ==='],
        ['Company', 'Role', 'Status', 'Package Min', 'Package Max', 'Drive Date', 'Applicants'],
        ...drives.map(d => [d.companyName || '', d.roleTitle || '', d.status, d.packageMin || '', d.packageMax || '', d.driveDate ? new Date(d.driveDate).toLocaleDateString() : '', d.totalApplicants || 0])
      ];

      const csv = sections.map(r => Array.isArray(r) ? r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',') : '').join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comprehensive-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.addToast(`Report downloaded — ${students.length} students, ${projects.length} projects, ${drives.length} drives`, 'success');
    } catch (err) {
      toast.addToast('Failed to generate report. Please try again.', 'error');
    }
  };

  if (loading) return <div className="page"><div className="loading">Loading reports...</div></div>;

  const { students, projects, drives, applications } = data || { students: [], projects: [], drives: [], applications: [] };

  const placed = students.filter(s => s.placementStatus === 'PLACED').length;
  const placementRate = students.length ? ((placed / students.length) * 100).toFixed(1) : '0';
  const activeDrives = drives.filter(d => d.status === 'ONGOING' || d.status === 'UPCOMING').length;
  const selectedApps = applications.filter(a => a.status === 'SELECTED').length;

  const placementBreakdown = ['PLACED', 'ELIGIBLE', 'IN_PROCESS', 'INELIGIBLE'].map(status => {
    const count = students.filter(s => s.placementStatus === status).length;
    const pct = students.length ? ((count / students.length) * 100).toFixed(1) : '0';
    return { status, count, pct };
  });

  const projectBreakdown = ['ON_TRACK', 'COMPLETED', 'DELAYED', 'AT_RISK'].map(status => {
    const count = projects.filter(p => p.status === status).length;
    const pct = projects.length ? ((count / projects.length) * 100).toFixed(1) : '0';
    const avgProg = count ? Math.round(projects.filter(p => p.status === status).reduce((a, p) => a + (p.progressPercentage || 0), 0) / count) : 0;
    return { status, count, pct, avgProg };
  });

  const drivePipeline = [...drives]
    .sort((a, b) => (b.totalApplicants || 0) - (a.totalApplicants || 0))
    .slice(0, 8);

  const placedStudents = students.filter(s => s.placementStatus === 'PLACED').slice(0, 10);

  const majors = {};
  students.forEach(s => {
    if (!majors[s.major]) majors[s.major] = { total: 0, placed: 0 };
    majors[s.major].total++;
    if (s.placementStatus === 'PLACED') majors[s.major].placed++;
  });
  const majorStats = Object.entries(majors)
    .map(([major, m]) => ({ major, total: m.total, placed: m.placed, rate: m.total ? ((m.placed / m.total) * 100).toFixed(1) : '0' }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);

  return <div className="page">
    <PageHero
      eyebrow="INSTITUTIONAL INTELLIGENCE"
      title="Reports & Analytics"
      text="Live insights into placement performance, project health and recruitment pipeline — all from real data."
      buttons={[{ label: 'Export Students CSV', onClick: handleExportCSV }, { label: 'Generate Full Report', onClick: handleGenerateReport }]}
    />

    <div className="stats">
      <Stat icon={<TrendingUp />} title="Placement Rate" value={`${placementRate}%`} change={`${placed} of ${students.length} placed`} />
      <Stat icon={<CalendarDays />} title="Active Drives" value={activeDrives} change={`${drives.length} total drives`} />
      <Stat icon={<Users />} title="Total Students" value={students.length} change={`${students.filter(s => s.placementStatus === 'ELIGIBLE').length} eligible`} />
      <Stat icon={<CheckCircle2 />} title="Selected" value={selectedApps} change={`from ${applications.length} applications`} />
    </div>

    <div className="two-col">
      <Card title="Placement Status Breakdown" sub="Distribution of students across placement stages">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Status</th><th>Students</th><th>Share</th><th></th></tr></thead>
            <tbody>
              {placementBreakdown.map(({ status, count, pct }) => (
                <tr key={status}>
                  <td><Status text={status} /></td>
                  <td><b>{count}</b></td>
                  <td>{pct}%</td>
                  <td>
                    <div style={{ width: '100px', height: '6px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#4f46e5', borderRadius: '99px' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Project Health" sub="Status distribution across all academic projects">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Status</th><th>Projects</th><th>Avg Progress</th><th>Share</th></tr></thead>
            <tbody>
              {projectBreakdown.map(({ status, count, pct, avgProg }) => (
                <tr key={status}>
                  <td><Status text={status} /></td>
                  <td><b>{count}</b></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${avgProg}%`, height: '100%', background: '#10b981', borderRadius: '99px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{avgProg}%</span>
                    </div>
                  </td>
                  <td style={{ color: '#6b7280', fontSize: '13px' }}>{pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    <Card title="Recruitment Drive Pipeline" sub="Active and recent drives sorted by applicant volume">
      {drives.length === 0
        ? <p style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No drives found. Schedule drives from the Companies & Drives page.</p>
        : <div className="table-wrap">
            <table>
              <thead><tr><th>Company</th><th>Role</th><th>Status</th><th>Applicants</th><th>Package Range</th><th>Deadline</th></tr></thead>
              <tbody>
                {drivePipeline.map(d => (
                  <tr key={d.id}>
                    <td><b>{d.companyName}</b></td>
                    <td>{d.roleTitle}</td>
                    <td><Status text={d.status} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <b>{d.totalApplicants || 0}</b>
                        {d.shortlistedCount > 0 && <span style={{ fontSize: '12px', color: '#10b981' }}>({d.shortlistedCount} shortlisted)</span>}
                      </div>
                    </td>
                    <td>{d.packageMin && d.packageMax ? `$${d.packageMin}k – $${d.packageMax}k` : '—'}</td>
                    <td>{d.applicationDeadline ? new Date(d.applicationDeadline).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </Card>

    <div className="two-col">
      <Card title="Placement by Major" sub="Placement rates across academic disciplines">
        {majorStats.length === 0
          ? <p style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No student data available.</p>
          : <div className="table-wrap">
              <table>
                <thead><tr><th>Major</th><th>Students</th><th>Placed</th><th>Rate</th></tr></thead>
                <tbody>
                  {majorStats.map(m => (
                    <tr key={m.major}>
                      <td><b>{m.major}</b></td>
                      <td>{m.total}</td>
                      <td><span style={{ color: '#10b981', fontWeight: 600 }}>{m.placed}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '60px', height: '6px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ width: `${m.rate}%`, height: '100%', background: '#4f46e5', borderRadius: '99px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>{m.rate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </Card>

      <Card title="Placed Students" sub="Students who have secured placements">
        {placedStudents.length === 0
          ? <p style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No placed students yet.</p>
          : <div className="table-wrap">
              <table>
                <thead><tr><th>Student</th><th>Major</th><th>GPA</th></tr></thead>
                <tbody>
                  {placedStudents.map(s => (
                    <tr key={s.id}>
                      <td>
                        <div className="person">
                          <div className="avatar">{(s.name || '?')[0]}</div>
                          <div><b>{s.name}</b><small>{s.email}</small></div>
                        </div>
                      </td>
                      <td>{s.major}</td>
                      <td><b>{s.gpa}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </Card>
    </div>
  </div>;
}
function Profile(){const [showEditModal,setShowEditModal]=useState(false); const toast=useToast(); const user=JSON.parse(localStorage.getItem('ep_user')||'{}');
 const [profileForm,setProfileForm]=useState({name:user.name||'Alex Johnson',email:user.email||'alex.johnson@eduplacement.edu',phone:'+1 (555) 012-3456',department:'Corporate Relations & Placement',bio:'Senior Administrator at EduPlacement Pro with experience in higher education management and corporate recruitment pipelines.'});
 
 const handleProfileUpdate=(e)=>{e.preventDefault(); const updatedUser={...user,name:profileForm.name,email:profileForm.email}; localStorage.setItem('ep_user',JSON.stringify(updatedUser)); setShowEditModal(false); toast.addToast('Profile updated successfully!','success');};
 
 return <div className="page"><div className="title-row"><div><h1>User Profile</h1><p>Manage your personal information, security and institutional role settings.</p></div><button className="btn primary" onClick={()=>setShowEditModal(true)}>Edit Profile</button></div><div className="profile-layout"><div className="profile-card"><div className="profile-cover"/><div className="profile-avatar">{(profileForm.name[0]||'A').toUpperCase()}</div><h2>{profileForm.name}</h2><p>Senior Administrator</p><span className="verified">VERIFIED</span><div className="profile-details"><span><Mail size={15}/> {profileForm.email}</span><span><BriefcaseBusiness size={15}/> {profileForm.department}</span><span><Building2 size={15}/> Main Campus, Building A</span><span><CalendarDays size={15}/> Joined Sept 12, 2021</span></div></div><Card title="Personal Information" sub="Update your contact information and office details."><div className="form-grid">{[['Full Name',profileForm.name],['Institutional Email',profileForm.email],['Contact Number',profileForm.phone],['Department',profileForm.department]].map(x=><label key={x[0]}>{x[0]}<input value={x[1]} readOnly/></label>)}</div><label>Professional Biography<textarea readOnly value={profileForm.bio}/></label></Card></div>
 <Modal isOpen={showEditModal} onClose={()=>setShowEditModal(false)} title="Edit Profile"><form onSubmit={handleProfileUpdate} className="modal-form"><label>Full Name<input required value={profileForm.name} onChange={e=>setProfileForm({...profileForm,name:e.target.value})} placeholder="Enter your name"/></label><label>Email Address<input required type="email" value={profileForm.email} onChange={e=>setProfileForm({...profileForm,email:e.target.value})} placeholder="you@eduplacement.edu"/></label><label>Contact Number<input type="tel" value={profileForm.phone} onChange={e=>setProfileForm({...profileForm,phone:e.target.value})} placeholder="+1 (555) 000-0000"/></label><label>Department<input value={profileForm.department} onChange={e=>setProfileForm({...profileForm,department:e.target.value})} placeholder="Your department"/></label><label>Professional Biography<textarea value={profileForm.bio} onChange={e=>setProfileForm({...profileForm,bio:e.target.value})} placeholder="Tell us about yourself" rows="4"/></label><div className="modal-actions"><button type="button" className="btn outline" onClick={()=>setShowEditModal(false)}>Cancel</button><button type="submit" className="btn primary">Save Changes</button></div></form></Modal></div>}
function StudentDashboard(){
  const [studentData,setStudentData]=useState(null);
  const [applications,setApplications]=useState([]);
  const [interviews,setInterviews]=useState([]);
  const [stats,setStats]=useState({activeApplications:0,shortlisted:0,interviews:0,trainings:0});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const user=JSON.parse(localStorage.getItem('ep_user')||'{}');

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        console.log('Fetching student data for user:',user.email);
        const currentStudent=await studentsAPI.getMe();
        console.log('Found current student:',currentStudent);
        setStudentData(currentStudent);

        // Fetch applications for this student
        try{
          const allApplications=await applicationsAPI.getAll();
          const studentApps=allApplications.filter(app=>app.student?.id===currentStudent.id);
          setApplications(studentApps);

          // Calculate stats from applications
          const activeApps=studentApps.filter(app=>['APPLIED','SCREENING'].includes(app.status)).length;
          const shortlistedApps=studentApps.filter(app=>app.status==='SHORTLISTED').length;
          setStats(prev=>({...prev,activeApplications:activeApps,shortlisted:shortlistedApps}));
        }catch(err){
          console.log('Could not load applications:',err.message);
        }

        // Fetch interviews for this student
        try{
          const allInterviews=await interviewsAPI.getAll();
          const studentInterviews=allInterviews.filter(iv=>iv.student?.id===currentStudent.id);
          setInterviews(studentInterviews);
          setStats(prev=>({...prev,interviews:studentInterviews.length}));
        }catch(err){
          console.log('Could not load interviews:',err.message);
        }

        // Fetch trainings enrolled
        try{
          const allTrainings=await trainingsAPI.getAll();
          setStats(prev=>({...prev,trainings:allTrainings.length}));
        }catch(err){
          console.log('Could not load trainings:',err.message);
        }

      }catch(err){
        console.error('Failed to load student data:',err);
        setError('Failed to load student data: '+err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  if(loading)return <div className="page"><div className="loading">Loading dashboard...</div></div>;
  if(error)return <div className="page"><div className="error">{error}</div></div>;
  if(!studentData)return <div className="page"><div className="error">Student data not found</div></div>;

  return <div className="page"><PageHero eyebrow={`BATCH ${studentData.batch} · ${studentData.major.toUpperCase()}`} title={`Welcome, ${studentData.name}`} text="Track your placement readiness, recruitment activity and upcoming opportunities." buttons={[{label:'Take Skill Assessment',onClick:()=>{}},{label:'Download Resume',onClick:()=>{}}]}/><div className="stats"><Stat icon={<BriefcaseBusiness/>} title="Active Applications" value={stats.activeApplications} change={stats.activeApplications>0?`${stats.activeApplications} active`:''}/><Stat icon={<CheckCircle2/>} title="Shortlisted" value={stats.shortlisted} change=""/><Stat icon={<Clock/>} title="Interviews" value={stats.interviews} change={stats.interviews>0?`${stats.interviews} scheduled`:''}/><Stat icon={<BookOpen/>} title="Training Hub" value={stats.trainings} change={`${stats.trainings} available`}/></div><div className="two-col"><Card title="Placement Drives & Status" sub="Track your active recruitment cycles and explore new opportunities.">{applications.length>0?<TableCard title="" headers={['Company & Role','Status','Applied']} rows={applications.slice(0,5).map(app=>[`${app.drive?.company?.name||'Company'} - ${app.drive?.roleTitle||'Role'}`,app.status,new Date(app.appliedAt||app.createdAt).toLocaleDateString()])}/>:<p style={{padding:'20px',textAlign:'center',color:'#666'}}>No active applications yet. Apply to drives to get started!</p>}</Card><Card title="Interviews">{interviews.length>0?<div className="interviews">{interviews.slice(0,3).map(iv=><div key={iv.id}><b>{new Date(iv.interviewDate).toLocaleDateString('en-US',{month:'short',day:'numeric'}).toUpperCase()}</b><span>{iv.application?.drive?.company?.name||'Company'}<small>{new Date(iv.interviewDate).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})} · {iv.interviewType}</small></span></div>)}</div>:<p style={{padding:'20px',textAlign:'center',color:'#666'}}>No interviews scheduled yet.</p>}</Card></div><Card title="Your Readiness"><div className="readiness"><div><b>{studentData.readinessScore||0}</b><span>Readiness Score</span></div><div><span>GPA</span><progress value={(studentData.gpa/4)*100} max="100"/><span>{studentData.gpa}/4.0</span></div><div><span>Training Progress</span><progress value={studentData.trainingProgress||0} max="100"/><span>{studentData.trainingProgress||0}%</span></div></div></Card></div>}

function StudentDrives() {
  const [drives, setDrives] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [applying, setApplying] = useState(null);
  const toast = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const student = await studentsAPI.getMe();
      setStudentData(student);

      const [activeDrives, applications] = await Promise.all([
        drivesAPI.getActive(),
        applicationsAPI.getByStudent(student.id)
      ]);

      setDrives(activeDrives);
      setMyApplications(applications);
    } catch (err) {
      console.error('Failed to load drives:', err);
      toast.addToast('Failed to load drives data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const hasApplied = (driveId) => {
    return myApplications.some(app => app.driveId === driveId);
  };

  const handleApply = async (drive) => {
    if (!studentData) {
      toast.addToast('Student data not loaded', 'error');
      return;
    }

    setApplying(drive.id);
    try {
      const applicationData = {
        student: { id: studentData.id },
        drive: { id: drive.id },
        status: 'APPLIED',
        appliedAt: new Date().toISOString()
      };

      await applicationsAPI.create(applicationData);
      await loadData();
      toast.addToast(`Successfully applied to ${drive.companyName}!`, 'success');
    } catch (err) {
      console.error('Application failed:', err);
      toast.addToast(err.message || 'Failed to apply', 'error');
    } finally {
      setApplying(null);
    }
  };

  if (loading) return <div className="page"><div className="loading">Loading drives...</div></div>;

  return <div className="page">
    <PageHero 
      eyebrow="PLACEMENT OPPORTUNITIES" 
      title="Available Drives" 
      text="Browse active placement drives and track your applications in real-time." 
    />

    <div className="stats">
      <Stat icon={<Building2 />} title="Active Drives" value={drives.length} change="" />
      <Stat icon={<BriefcaseBusiness />} title="My Applications" value={myApplications.length} change="" />
      <Stat icon={<CheckCircle2 />} title="Shortlisted" value={myApplications.filter(a => a.status === 'SHORTLISTED').length} change="" />
      <Stat icon={<Clock />} title="Pending" value={myApplications.filter(a => a.status === 'APPLIED' || a.status === 'SCREENING').length} change="" />
    </div>

    <div className="tabs" style={{ marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
      <button 
        className={activeTab === 'browse' ? 'tab active' : 'tab'} 
        onClick={() => setActiveTab('browse')}
        style={{ padding: '12px 24px', border: 'none', background: 'none', borderBottom: activeTab === 'browse' ? '2px solid #4f46e5' : 'none', fontWeight: activeTab === 'browse' ? 600 : 400, color: activeTab === 'browse' ? '#4f46e5' : '#6b7280', cursor: 'pointer' }}
      >
        Browse Drives
      </button>
      <button 
        className={activeTab === 'my-applications' ? 'tab active' : 'tab'} 
        onClick={() => setActiveTab('my-applications')}
        style={{ padding: '12px 24px', border: 'none', background: 'none', borderBottom: activeTab === 'my-applications' ? '2px solid #4f46e5' : 'none', fontWeight: activeTab === 'my-applications' ? 600 : 400, color: activeTab === 'my-applications' ? '#4f46e5' : '#6b7280', cursor: 'pointer' }}
      >
        My Applications ({myApplications.length})
      </button>
    </div>

    {activeTab === 'browse' ? (
      <div className="drives-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {drives.length === 0 ? (
          <Card><p style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No active drives at the moment. Check back later!</p></Card>
        ) : (
          drives.map(drive => {
            const applied = hasApplied(drive.id);
            return (
              <div key={drive.id} className="drive-card" style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{drive.companyName}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>{drive.roleTitle}</p>
                  </div>
                  <Status text={drive.status} />
                </div>
                
                {drive.description && <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px', lineHeight: 1.5 }}>{drive.description.substring(0, 120)}{drive.description.length > 120 ? '...' : ''}</p>}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '13px' }}>
                  <div>
                    <label style={{ color: '#9ca3af', display: 'block', marginBottom: '2px' }}>Package</label>
                    <span style={{ fontWeight: 600 }}>{drive.packageMin && drive.packageMax ? `$${drive.packageMin}k - $${drive.packageMax}k` : '—'}</span>
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', display: 'block', marginBottom: '2px' }}>Min GPA</label>
                    <span style={{ fontWeight: 600 }}>{drive.minGpa || '—'}</span>
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', display: 'block', marginBottom: '2px' }}>Deadline</label>
                    <span style={{ fontWeight: 600 }}>{drive.applicationDeadline ? new Date(drive.applicationDeadline).toLocaleDateString() : '—'}</span>
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', display: 'block', marginBottom: '2px' }}>Applicants</label>
                    <span style={{ fontWeight: 600 }}>{drive.totalApplicants || 0}</span>
                  </div>
                </div>

                {drive.requiredSkills && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Skills Required</label>
                    <p style={{ fontSize: '13px', color: '#4b5563' }}>{drive.requiredSkills}</p>
                  </div>
                )}

                <button 
                  className="btn primary full" 
                  onClick={() => handleApply(drive)}
                  disabled={applied || applying === drive.id}
                  style={{ opacity: applied ? 0.6 : 1, cursor: applied ? 'not-allowed' : 'pointer' }}
                >
                  {applying === drive.id ? 'Applying...' : applied ? 'Applied ✓' : 'Apply Now'}
                </button>
              </div>
            );
          })
        )}
      </div>
    ) : (
      <Card title="My Applications">
        {myApplications.length === 0 ? (
          <p style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>You haven't applied to any drives yet. Go to "Browse Drives" to apply!</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Applied On</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map(app => (
                  <tr key={app.id}>
                    <td><b>{app.companyName || '—'}</b></td>
                    <td>{app.roleTitle || '—'}</td>
                    <td><Status text={app.status} /></td>
                    <td>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '—'}</td>
                    <td>{app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    )}
  </div>;
}

function StudentProjects(){
  const [projects,setProjects]=useState([]);
  const [loading,setLoading]=useState(true);
  const [showDetailModal,setShowDetailModal]=useState(false);
  const [showUpdateModal,setShowUpdateModal]=useState(false);
  const [selectedProject,setSelectedProject]=useState(null);
  const [updates,setUpdates]=useState([]);
  const [comments,setComments]=useState([]);
  const [detailLoading,setDetailLoading]=useState(false);
  const [updateForm,setUpdateForm]=useState({updateText:'',progressPercentage:'',updateType:'PROGRESS'});
  const [updateLoading,setUpdateLoading]=useState(false);
  const toast=useToast();

  const loadProjects=async()=>{
    try{const data=await projectsAPI.getMyProjects(); setProjects(data);}
    catch(err){console.error('Failed to load projects:',err);}
    finally{setLoading(false);}
  };

  useEffect(()=>{loadProjects();},[]);

  const openDetail=async(project)=>{
    setSelectedProject(project); setShowDetailModal(true);
    setDetailLoading(true); setUpdates([]); setComments([]);
    try{
      const [u,c]=await Promise.all([
        projectUpdatesAPI.getByProject(project.id),
        projectCommentsAPI.getByProject(project.id)
      ]);
      setUpdates(u); setComments(c);
    }catch(err){console.error('Failed to load details:',err);}
    finally{setDetailLoading(false);}
  };

  const handlePostUpdate=async(e)=>{
    e.preventDefault(); setUpdateLoading(true);
    try{
      await projectUpdatesAPI.create({
        projectId:selectedProject.id,
        updateText:updateForm.updateText,
        progressPercentage:updateForm.progressPercentage?parseInt(updateForm.progressPercentage):null,
        updateType:updateForm.updateType
      });
      const [u,c]=await Promise.all([
        projectUpdatesAPI.getByProject(selectedProject.id),
        projectCommentsAPI.getByProject(selectedProject.id)
      ]);
      setUpdates(u); setComments(c);
      await loadProjects();
      if(updateForm.progressPercentage){
        setSelectedProject(prev=>({...prev,progressPercentage:parseInt(updateForm.progressPercentage)}));
      }
      setShowUpdateModal(false);
      setUpdateForm({updateText:'',progressPercentage:'',updateType:'PROGRESS'});
      toast.addToast('Update posted successfully!','success');
    }catch(err){toast.addToast(err.message||'Failed to post update','error');}
    finally{setUpdateLoading(false);}
  };

  const fmtDate=(s)=>{
    if(!s)return '';
    const d=new Date(s),now=new Date(),diff=Math.floor((now-d)/1000);
    if(diff<60)return 'just now';
    if(diff<3600)return Math.floor(diff/60)+'m ago';
    if(diff<86400)return Math.floor(diff/3600)+'h ago';
    if(diff<604800)return Math.floor(diff/86400)+'d ago';
    return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  };

  const updateIcon=(t)=>({MILESTONE:'🎯',ISSUE:'⚠️',COMPLETION:'🎉'}[t]||'📝');

  const timeline=[
    ...updates.map(u=>({...u,_type:'update'})),
    ...comments.map(c=>({...c,_type:'comment'}))
  ].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));

  if(loading)return <div className="page"><div className="loading">Loading your projects…</div></div>;

  return <div className="page">
    <div className="title-row">
      <div><h1>My Projects</h1><p>Track your progress, post updates, and read feedback from your mentor.</p></div>
    </div>

    {projects.length===0
      ?<div style={{textAlign:'center',padding:'60px 20px',background:'white',borderRadius:'16px',border:'1px solid #e5e7eb',marginTop:'24px'}}>
        <FolderKanban size={48} style={{color:'#d1d5db',marginBottom:'16px'}}/>
        <h3 style={{color:'#374151',marginBottom:'8px'}}>No projects assigned yet</h3>
        <p style={{color:'#6b7280'}}>Your administrator will assign projects to you. Check back soon!</p>
      </div>
      :<div className="proj-cards-grid">
        {projects.map(p=>(
          <div key={p.id} className="proj-card" onClick={()=>openDetail(p)}>
            <div className="proj-card-top">
              <div><h3>{p.title}</h3><small>{p.projectCode}</small></div>
              <Status text={p.status}/>
            </div>
            {p.description&&<p className="proj-card-desc">{p.description}</p>}
            <div className="proj-card-meta">
              <span>👨‍🏫 {p.mentorName}</span>
              <span style={{color:'#9ca3af',fontSize:'12px'}}>Tap to view →</span>
            </div>
            <div className="proj-card-progress">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{fontSize:'13px',color:'#555'}}>Progress</span>
                <span style={{fontSize:'13px',fontWeight:700,color:'#4f46e5'}}>{p.progressPercentage||0}%</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{width:`${p.progressPercentage||0}%`}}/></div>
            </div>
          </div>
        ))}
      </div>
    }

    {/* Project Detail Modal */}
    <Modal isOpen={showDetailModal} onClose={()=>{setShowDetailModal(false);setSelectedProject(null);}} title={selectedProject?.title||'Project Details'} size="large">
      {selectedProject&&<div className="proj-detail">
        <div className="proj-meta-grid">
          <div className="proj-meta-item"><label>Mentor</label><span>{selectedProject.mentorName}</span></div>
          <div className="proj-meta-item"><label>Status</label><Status text={selectedProject.status}/></div>
          <div className="proj-meta-item"><label>Progress</label>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div className="prog-bar" style={{width:'100px'}}><div className="prog-fill" style={{width:`${selectedProject.progressPercentage||0}%`}}/></div>
              <span style={{fontWeight:700}}>{selectedProject.progressPercentage||0}%</span>
            </div>
          </div>
          <div className="proj-meta-item"><label>Code</label><span style={{fontFamily:'monospace',fontSize:'12px'}}>{selectedProject.projectCode}</span></div>
        </div>
        {selectedProject.description&&<div className="proj-desc"><p>{selectedProject.description}</p></div>}

        <div className="proj-timeline-section">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
            <h3 style={{fontSize:'15px',margin:0}}>Activity Timeline&nbsp;<span style={{fontWeight:400,color:'#9ca3af',fontSize:'13px'}}>({updates.length} updates · {comments.length} comments)</span></h3>
            <button className="btn primary" style={{padding:'7px 16px',fontSize:'13px'}} onClick={()=>setShowUpdateModal(true)}>+ Post Update</button>
          </div>
          {detailLoading
            ?<div style={{textAlign:'center',padding:'32px',color:'#9ca3af'}}>Loading timeline…</div>
            :<div className="proj-timeline-feed">
              {timeline.length===0&&<div className="proj-empty-timeline">No activity yet. Post your first update using the button above!</div>}
              {timeline.map(item=>item._type==='update'
                ?<div key={'u'+item.id} className="proj-timeline-entry proj-update-entry">
                  <div className="proj-entry-icon">{updateIcon(item.updateType)}</div>
                  <div className="proj-entry-body">
                    <div className="proj-entry-header">
                      <strong>{item.postedByName}</strong>
                      <span className="proj-badge proj-badge-update">{item.updateType}</span>
                      <span className="proj-entry-time">{fmtDate(item.createdAt)}</span>
                    </div>
                    <p>{item.updateText}</p>
                    {item.progressPercentage!=null&&<div className="proj-progress-note">Progress updated to {item.progressPercentage}%</div>}
                  </div>
                </div>
                :<div key={'c'+item.id} className="proj-timeline-entry proj-comment-entry">
                  <div className="proj-entry-icon">💬</div>
                  <div className="proj-entry-body">
                    <div className="proj-entry-header">
                      <strong>{item.commentedByName}</strong>
                      <span className={`proj-badge proj-badge-${(item.commentedByRole||'').toLowerCase()}`}>{item.commentedByRole}</span>
                      <span className="proj-entry-time">{fmtDate(item.createdAt)}</span>
                    </div>
                    <p style={{color:'#1d4ed8'}}>{item.commentText}</p>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>}
    </Modal>

    {/* Post Update Modal */}
    <Modal isOpen={showUpdateModal} onClose={()=>{setShowUpdateModal(false);setUpdateForm({updateText:'',progressPercentage:'',updateType:'PROGRESS'});}} title="Post Project Update">
      <form onSubmit={handlePostUpdate} className="modal-form">
        <label>Update Type
          <select value={updateForm.updateType} onChange={e=>setUpdateForm({...updateForm,updateType:e.target.value})}>
            <option value="PROGRESS">📝 Progress Update</option>
            <option value="MILESTONE">🎯 Milestone Achieved</option>
            <option value="ISSUE">⚠️ Issue / Blocker</option>
            <option value="COMPLETION">🎉 Project Completed</option>
          </select>
        </label>
        <label>What did you work on?
          <textarea required value={updateForm.updateText} onChange={e=>setUpdateForm({...updateForm,updateText:e.target.value})} placeholder="Describe what you accomplished, any blockers, or milestones reached…" rows="4"/>
        </label>
        <label>Update Progress % (optional)
          <input type="number" min="0" max="100" value={updateForm.progressPercentage} onChange={e=>setUpdateForm({...updateForm,progressPercentage:e.target.value})} placeholder="e.g. 75 — leave blank to keep current progress"/>
        </label>
        <div className="modal-actions">
          <button type="button" className="btn outline" onClick={()=>{setShowUpdateModal(false);setUpdateForm({updateText:'',progressPercentage:'',updateType:'PROGRESS'});}}>Cancel</button>
          <button type="submit" className="btn primary" disabled={updateLoading}>{updateLoading?'Posting…':'Post Update'}</button>
        </div>
      </form>
    </Modal>
  </div>
}
function StudentProfile(){const [studentData,setStudentData]=useState(null); const [loading,setLoading]=useState(true); const user=JSON.parse(localStorage.getItem('ep_user')||'{}');
 useEffect(()=>{const fetchData=async()=>{try{const currentStudent=await studentsAPI.getMe(); setStudentData(currentStudent);}catch(err){console.error('Failed to load student data:',err);}finally{setLoading(false);}}; fetchData();},[]);
 if(loading)return <div className="page"><div className="loading">Loading profile...</div></div>; if(!studentData)return <div className="page"><div className="error">Student profile not found. Please contact administrator.</div></div>;
 return <div className="page"><div className="title-row"><div><h1>My Profile</h1><p>View and update the information used across your placement journey.</p></div><button className="btn primary">Edit Profile</button></div><div className="profile-layout"><div className="profile-card"><div className="profile-cover"/><div className="profile-avatar">{studentData.name[0]}</div><h2>{studentData.name}</h2><p>{studentData.major}</p><span className="verified">{studentData.studentId}</span><div className="profile-details"><span><Mail size={15}/> {studentData.email}</span><span><GraduationCap size={15}/> Class of {studentData.graduationYear||studentData.batch}</span><span><Target size={15}/> GPA {studentData.gpa}</span><span><CheckCircle2 size={15}/> {studentData.placementStatus}</span></div></div><Card title="Academic & Placement Information"><div className="form-grid">{[['Full Name',studentData.name],['Institutional Email',studentData.email],['Major',studentData.major],['Batch',studentData.batch],['GPA',studentData.gpa],['Placement Status',studentData.placementStatus]].map(x=><label key={x[0]}>{x[0]}<input value={x[1]} readOnly/></label>)}</div></Card></div></div>}

createRoot(document.getElementById('root')).render(<App/>);
