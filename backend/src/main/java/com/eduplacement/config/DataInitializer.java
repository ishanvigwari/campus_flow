package com.eduplacement.config;

import com.eduplacement.entity.*;
import com.eduplacement.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final DriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final TrainingRepository trainingRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized. Skipping seed data.");
            return;
        }

        log.info("Initializing database with seed data...");
        
        // Create admin user
        User adminUser = createAdminUser();
        
        // Create student users and profiles
        List<Student> students = createStudents();
        
        // Create companies
        List<Company> companies = createCompanies();
        
        // Create drives
        List<Drive> drives = createDrives(companies);
        
        // Create projects
        createProjects(students);
        
        // Create applications
        createApplications(students, drives);
        
        // Create trainings
        createTrainings();
        
        log.info("Database initialization completed successfully!");
    }

    private User createAdminUser() {
        User admin = new User();
        admin.setEmail("admin@eduplacement.edu");
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        admin.setName("Alex Johnson");
        admin.setRole(User.Role.ADMIN);
        admin.setActive(true);
        return userRepository.save(admin);
    }

    private List<Student> createStudents() {
        List<Student> students = new ArrayList<>();
        
        // Student 1: Emma Sullivan
        User user1 = new User();
        user1.setEmail("emma@eduplacement.edu");
        user1.setPasswordHash(passwordEncoder.encode("student123"));
        user1.setName("Emma Sullivan");
        user1.setRole(User.Role.STUDENT);
        user1.setActive(true);
        user1 = userRepository.save(user1);
        
        Student student1 = new Student();
        student1.setUser(user1);
        student1.setStudentId("STU001");
        student1.setMajor("Computer Science");
        student1.setBatch("2024");
        student1.setGpa(new BigDecimal("3.85"));
        student1.setPlacementStatus(Student.PlacementStatus.PLACED);
        student1.setTrainingProgress(100);
        student1.setContactNumber("+1-555-0101");
        student1.setPlacedCompany("TechFlow Systems");
        student1.setPackageOffered(new BigDecimal("120000"));
        student1.setReadinessScore(92);
        students.add(studentRepository.save(student1));
        
        // Student 2: Marcus Chen
        User user2 = new User();
        user2.setEmail("marcus@eduplacement.edu");
        user2.setPasswordHash(passwordEncoder.encode("student123"));
        user2.setName("Marcus Chen");
        user2.setRole(User.Role.STUDENT);
        user2.setActive(true);
        user2 = userRepository.save(user2);
        
        Student student2 = new Student();
        student2.setUser(user2);
        student2.setStudentId("STU002");
        student2.setMajor("Mechanical Engineering");
        student2.setBatch("2024");
        student2.setGpa(new BigDecimal("3.62"));
        student2.setPlacementStatus(Student.PlacementStatus.IN_PROCESS);
        student2.setTrainingProgress(75);
        student2.setContactNumber("+1-555-0102");
        student2.setReadinessScore(78);
        students.add(studentRepository.save(student2));
        
        // Student 3: Sophia Rodriguez
        User user3 = new User();
        user3.setEmail("sophia@eduplacement.edu");
        user3.setPasswordHash(passwordEncoder.encode("student123"));
        user3.setName("Sophia Rodriguez");
        user3.setRole(User.Role.STUDENT);
        user3.setActive(true);
        user3 = userRepository.save(user3);
        
        Student student3 = new Student();
        student3.setUser(user3);
        student3.setStudentId("STU003");
        student3.setMajor("Business Analytics");
        student3.setBatch("2024");
        student3.setGpa(new BigDecimal("3.92"));
        student3.setPlacementStatus(Student.PlacementStatus.ELIGIBLE);
        student3.setTrainingProgress(45);
        student3.setContactNumber("+1-555-0103");
        student3.setReadinessScore(85);
        students.add(studentRepository.save(student3));
        
        // Student 4: Liam O'Connor
        User user4 = new User();
        user4.setEmail("liam@eduplacement.edu");
        user4.setPasswordHash(passwordEncoder.encode("student123"));
        user4.setName("Liam O'Connor");
        user4.setRole(User.Role.STUDENT);
        user4.setActive(true);
        user4 = userRepository.save(user4);
        
        Student student4 = new Student();
        student4.setUser(user4);
        student4.setStudentId("STU004");
        student4.setMajor("Data Science");
        student4.setBatch("2023");
        student4.setGpa(new BigDecimal("3.45"));
        student4.setPlacementStatus(Student.PlacementStatus.INELIGIBLE);
        student4.setTrainingProgress(20);
        student4.setContactNumber("+1-555-0104");
        student4.setReadinessScore(62);
        students.add(studentRepository.save(student4));
        
        // Student 5: Aisha Khan
        User user5 = new User();
        user5.setEmail("aisha@eduplacement.edu");
        user5.setPasswordHash(passwordEncoder.encode("student123"));
        user5.setName("Aisha Khan");
        user5.setRole(User.Role.STUDENT);
        user5.setActive(true);
        user5 = userRepository.save(user5);
        
        Student student5 = new Student();
        student5.setUser(user5);
        student5.setStudentId("STU005");
        student5.setMajor("Information Systems");
        student5.setBatch("2024");
        student5.setGpa(new BigDecimal("3.78"));
        student5.setPlacementStatus(Student.PlacementStatus.ELIGIBLE);
        student5.setTrainingProgress(60);
        student5.setContactNumber("+1-555-0105");
        student5.setReadinessScore(82);
        students.add(studentRepository.save(student5));
        
        return students;
    }

    private List<Company> createCompanies() {
        List<Company> companies = new ArrayList<>();
        
        Company company1 = new Company();
        company1.setName("TechFlow Systems");
        company1.setDescription("Leading software development company");
        company1.setIndustry("Technology");
        company1.setWebsite("https://techflow.com");
        company1.setContactPerson("John Smith");
        company1.setContactEmail("hr@techflow.com");
        company1.setContactPhone("+1-800-TECH-FLOW");
        company1.setActive(true);
        companies.add(companyRepository.save(company1));
        
        Company company2 = new Company();
        company2.setName("Global Finance Corp");
        company2.setDescription("International financial services");
        company2.setIndustry("Finance");
        company2.setWebsite("https://globalfinance.com");
        company2.setContactPerson("Sarah Johnson");
        company2.setContactEmail("careers@globalfinance.com");
        company2.setContactPhone("+1-800-GFC-JOBS");
        company2.setActive(true);
        companies.add(companyRepository.save(company2));
        
        Company company3 = new Company();
        company3.setName("CloudScale Inc");
        company3.setDescription("Cloud infrastructure solutions");
        company3.setIndustry("Cloud Computing");
        company3.setWebsite("https://cloudscale.io");
        company3.setContactPerson("Mike Davis");
        company3.setContactEmail("jobs@cloudscale.io");
        company3.setContactPhone("+1-800-CLOUD-SC");
        company3.setActive(true);
        companies.add(companyRepository.save(company3));
        
        Company company4 = new Company();
        company4.setName("Nexus AI");
        company4.setDescription("Artificial intelligence research");
        company4.setIndustry("AI/ML");
        company4.setWebsite("https://nexusai.com");
        company4.setContactPerson("Dr. Emily Chen");
        company4.setContactEmail("recruit@nexusai.com");
        company4.setContactPhone("+1-800-NEXUS-AI");
        company4.setActive(true);
        companies.add(companyRepository.save(company4));
        
        Company company5 = new Company();
        company5.setName("Stellar Health Tech");
        company5.setDescription("Healthcare technology solutions");
        company5.setIndustry("HealthTech");
        company5.setWebsite("https://stellarhealth.com");
        company5.setContactPerson("Dr. Robert Wilson");
        company5.setContactEmail("hr@stellarhealth.com");
        company5.setContactPhone("+1-800-STELLAR");
        company5.setActive(true);
        companies.add(companyRepository.save(company5));
        
        return companies;
    }

    private List<Drive> createDrives(List<Company> companies) {
        List<Drive> drives = new ArrayList<>();
        
        Drive drive1 = new Drive();
        drive1.setCompany(companies.get(0)); // TechFlow Systems
        drive1.setRoleTitle("Full Stack Developer");
        drive1.setDescription("Looking for talented full-stack developers");
        drive1.setRequiredSkills("React, Node.js, PostgreSQL, AWS");
        drive1.setMinGpa(new BigDecimal("3.0"));
        drive1.setPackageMin(new BigDecimal("110000"));
        drive1.setPackageMax(new BigDecimal("130000"));
        drive1.setTotalApplicants(156);
        drive1.setShortlistedCount(45);
        drive1.setStatus(Drive.DriveStatus.ONGOING);
        drive1.setDriveDate(LocalDate.now().plusDays(15));
        drive1.setApplicationDeadline(LocalDate.now().plusDays(10));
        drive1.setEligibleBatches("2024");
        drive1.setEligibleMajors("Computer Science,Information Technology");
        drives.add(driveRepository.save(drive1));
        
        Drive drive2 = new Drive();
        drive2.setCompany(companies.get(1)); // Global Finance Corp
        drive2.setRoleTitle("Data Analyst");
        drive2.setDescription("Data analysis for financial services");
        drive2.setRequiredSkills("Python, SQL, Tableau, Excel");
        drive2.setMinGpa(new BigDecimal("3.2"));
        drive2.setPackageMin(new BigDecimal("95000"));
        drive2.setPackageMax(new BigDecimal("110000"));
        drive2.setTotalApplicants(89);
        drive2.setShortlistedCount(30);
        drive2.setStatus(Drive.DriveStatus.SHORTLISTING);
        drive2.setDriveDate(LocalDate.now().plusDays(20));
        drive2.setApplicationDeadline(LocalDate.now().plusDays(5));
        drive2.setEligibleBatches("2024");
        drive2.setEligibleMajors("Business Analytics,Data Science");
        drives.add(driveRepository.save(drive2));
        
        Drive drive3 = new Drive();
        drive3.setCompany(companies.get(2)); // CloudScale Inc
        drive3.setRoleTitle("DevOps Engineer");
        drive3.setDescription("Cloud infrastructure and DevOps");
        drive3.setRequiredSkills("Docker, Kubernetes, AWS, CI/CD");
        drive3.setMinGpa(new BigDecimal("3.0"));
        drive3.setPackageMin(new BigDecimal("105000"));
        drive3.setPackageMax(new BigDecimal("125000"));
        drive3.setTotalApplicants(42);
        drive3.setShortlistedCount(15);
        drive3.setStatus(Drive.DriveStatus.UPCOMING);
        drive3.setDriveDate(LocalDate.now().plusDays(30));
        drive3.setApplicationDeadline(LocalDate.now().plusDays(20));
        drive3.setEligibleBatches("2024");
        drive3.setEligibleMajors("Computer Science,Information Systems");
        drives.add(driveRepository.save(drive3));
        
        return drives;
    }

    private void createProjects(List<Student> students) {
        Project project1 = new Project();
        project1.setProjectCode("PRJ-2024-001");
        project1.setTitle("AI-Driven Healthcare Diagnostic Tool");
        project1.setDescription("Machine learning model for medical diagnosis");
        project1.setStudent(students.get(0)); // Emma Sullivan
        project1.setMentorName("Dr. Sarah Williams");
        project1.setProgressPercentage(75);
        project1.setStatus(Project.ProjectStatus.ON_TRACK);
        project1.setStartDate(LocalDateTime.now().minusMonths(3));
        project1.setEndDate(LocalDateTime.now().plusMonths(1));
        project1.setTechnologies("Python, TensorFlow, Flask, React");
        projectRepository.save(project1);
        
        Project project2 = new Project();
        project2.setProjectCode("PRJ-2024-003");
        project2.setTitle("Blockchain Logistics Optimization");
        project2.setDescription("Supply chain management using blockchain");
        project2.setStudent(students.get(1)); // Marcus Chen
        project2.setMentorName("Prof. David Miller");
        project2.setProgressPercentage(45);
        project2.setStatus(Project.ProjectStatus.DELAYED);
        project2.setStartDate(LocalDateTime.now().minusMonths(4));
        project2.setEndDate(LocalDateTime.now().plusMonths(2));
        project2.setTechnologies("Ethereum, Solidity, Web3.js, Node.js");
        projectRepository.save(project2);
        
        Project project3 = new Project();
        project3.setProjectCode("PRJ-2024-004");
        project3.setTitle("Sustainable Smart City Grid");
        project3.setDescription("IoT-based energy management system");
        project3.setStudent(students.get(4)); // Aisha Khan
        project3.setMentorName("Dr. Robert Chen");
        project3.setProgressPercentage(20);
        project3.setStatus(Project.ProjectStatus.AT_RISK);
        project3.setStartDate(LocalDateTime.now().minusMonths(2));
        project3.setEndDate(LocalDateTime.now().plusMonths(3));
        project3.setTechnologies("IoT, MQTT, MongoDB, Python");
        projectRepository.save(project3);
    }

    private void createApplications(List<Student> students, List<Drive> drives) {
        // Emma's application to TechFlow
        Application app1 = new Application();
        app1.setStudent(students.get(0));
        app1.setDrive(drives.get(0));
        app1.setStatus(Application.ApplicationStatus.INTERVIEW_COMPLETED);
        app1.setAppliedAt(LocalDateTime.now().minusDays(15));
        applicationRepository.save(app1);
        
        // Interview for Emma
        Interview interview1 = new Interview();
        interview1.setApplication(app1);
        interview1.setStudent(students.get(0));
        interview1.setInterviewDate(LocalDateTime.now().plusDays(2).withHour(10).withMinute(0));
        interview1.setInterviewType(Interview.InterviewType.TECHNICAL);
        interview1.setLocation("Online - Zoom");
        interview1.setStatus(Interview.InterviewStatus.SCHEDULED);
        interview1.setInterviewerName("John Doe");
        interviewRepository.save(interview1);
        
        // Sophia's application to Global Finance
        Application app2 = new Application();
        app2.setStudent(students.get(2));
        app2.setDrive(drives.get(1));
        app2.setStatus(Application.ApplicationStatus.SHORTLISTED);
        app2.setAppliedAt(LocalDateTime.now().minusDays(10));
        applicationRepository.save(app2);
        
        // Interview for Sophia
        Interview interview2 = new Interview();
        interview2.setApplication(app2);
        interview2.setStudent(students.get(2));
        interview2.setInterviewDate(LocalDateTime.now().plusDays(4).withHour(14).withMinute(30));
        interview2.setInterviewType(Interview.InterviewType.HR);
        interview2.setLocation("Campus - Room 201");
        interview2.setStatus(Interview.InterviewStatus.SCHEDULED);
        interview2.setInterviewerName("Sarah Johnson");
        interviewRepository.save(interview2);
    }

    private void createTrainings() {
        Training training1 = new Training();
        training1.setTitle("Resume Mastery Workshop");
        training1.setDescription("Learn how to beat ATS systems and highlight your project achievements");
        training1.setType(Training.TrainingType.WORKSHOP);
        training1.setInstructor("Career Services Team");
        training1.setStartDate(LocalDate.now().plusDays(5));
        training1.setEndDate(LocalDate.now().plusDays(5));
        training1.setDurationHours(3);
        training1.setMaxParticipants(50);
        training1.setEnrolledCount(32);
        training1.setStatus(Training.TrainingStatus.UPCOMING);
        trainingRepository.save(training1);
        
        Training training2 = new Training();
        training2.setTitle("Advanced React Patterns");
        training2.setDescription("Master advanced React concepts and patterns");
        training2.setType(Training.TrainingType.COURSE);
        training2.setInstructor("Dr. Emily Chen");
        training2.setStartDate(LocalDate.now().plusDays(10));
        training2.setEndDate(LocalDate.now().plusDays(40));
        training2.setDurationHours(30);
        training2.setMaxParticipants(30);
        training2.setEnrolledCount(25);
        training2.setStatus(Training.TrainingStatus.UPCOMING);
        trainingRepository.save(training2);
        
        Training training3 = new Training();
        training3.setTitle("Professional Communication Skills");
        training3.setDescription("Effective communication in professional settings");
        training3.setType(Training.TrainingType.SEMINAR);
        training3.setInstructor("Prof. Michael Brown");
        training3.setStartDate(LocalDate.now().plusDays(7));
        training3.setEndDate(LocalDate.now().plusDays(7));
        training3.setDurationHours(4);
        training3.setMaxParticipants(100);
        training3.setEnrolledCount(78);
        training3.setStatus(Training.TrainingStatus.UPCOMING);
        trainingRepository.save(training3);
    }
}
