package com.eduplacement.service;

import com.eduplacement.dto.StudentRegistrationRequest;
import com.eduplacement.entity.Student;
import com.eduplacement.entity.User;
import com.eduplacement.exception.BadRequestException;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.repository.StudentRepository;
import com.eduplacement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public List<Student> getStudentsByAdmin(String adminEmail) {
        return studentRepository.findAll().stream()
                .filter(s -> adminEmail.equals(s.getCreatedBy()))
                .collect(java.util.stream.Collectors.toList());
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student getStudentByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found for user id: " + userId));
    }
    
    public Student getStudentByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for email: " + email));
    }

    public List<Student> searchStudents(String keyword) {
        return studentRepository.searchStudents(keyword);
    }

    public List<Student> getStudentsByStatus(Student.PlacementStatus status) {
        return studentRepository.findByPlacementStatus(status);
    }

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    @Transactional
    public Student createStudent(Student student) {
        // Validate user exists
        User user = userRepository.findById(student.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.STUDENT) {
            throw new BadRequestException("User must have STUDENT role");
        }

        // Check if student already exists for this user
        if (studentRepository.findByUserId(user.getId()).isPresent()) {
            throw new BadRequestException("Student profile already exists for this user");
        }

        return studentRepository.save(student);
    }

    @Transactional
    public Student registerStudent(StudentRegistrationRequest request, String adminEmail) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        // Create User entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.STUDENT);
        user.setActive(true);
        
        User savedUser = userRepository.save(user);

        // Create Student entity
        Student student = new Student();
        student.setUser(savedUser);
        student.setStudentId("STU" + String.format("%06d", savedUser.getId()));
        student.setMajor(request.getMajor());
        student.setBatch(String.valueOf(request.getGraduationYear()));
        student.setGpa(request.getGpa());
        student.setContactNumber(request.getPhoneNumber());
        student.setPlacementStatus(Student.PlacementStatus.ELIGIBLE);
        student.setReadinessScore(0);
        student.setTrainingProgress(0);
        student.setCreatedBy(adminEmail); // Track which admin enrolled this student
        
        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
            student.setBiography("Skills: " + request.getSkills());
        }

        return studentRepository.save(student);
    }

    @Transactional
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);

        if (studentDetails.getMajor() != null) student.setMajor(studentDetails.getMajor());
        if (studentDetails.getBatch() != null) student.setBatch(studentDetails.getBatch());
        if (studentDetails.getGpa() != null) student.setGpa(studentDetails.getGpa());
        if (studentDetails.getPlacementStatus() != null) student.setPlacementStatus(studentDetails.getPlacementStatus());
        if (studentDetails.getTrainingProgress() != null) student.setTrainingProgress(studentDetails.getTrainingProgress());
        if (studentDetails.getContactNumber() != null) student.setContactNumber(studentDetails.getContactNumber());
        if (studentDetails.getPlacedCompany() != null) student.setPlacedCompany(studentDetails.getPlacedCompany());
        if (studentDetails.getPackageOffered() != null) student.setPackageOffered(studentDetails.getPackageOffered());
        if (studentDetails.getReadinessScore() != null) student.setReadinessScore(studentDetails.getReadinessScore());
        if (studentDetails.getBiography() != null) student.setBiography(studentDetails.getBiography());

        return studentRepository.save(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public Map<String, Object> getStudentStatistics() {
        Long totalStudents = studentRepository.count();
        Long placedStudents = studentRepository.countByPlacementStatus(Student.PlacementStatus.PLACED);
        Long eligibleStudents = studentRepository.countByPlacementStatus(Student.PlacementStatus.ELIGIBLE);
        Double averageGpa = studentRepository.getAverageGpa();

        return Map.of(
                "totalStudents", totalStudents,
                "placedStudents", placedStudents,
                "eligibleStudents", eligibleStudents,
                "averageGpa", averageGpa != null ? averageGpa : 0.0,
                "placementRate", totalStudents > 0 ? (placedStudents * 100.0 / totalStudents) : 0.0
        );
    }
    
    public Map<String, Object> getStudentStatisticsByAdmin(String adminEmail) {
        List<Student> adminStudents = getStudentsByAdmin(adminEmail);
        
        long totalStudents = adminStudents.size();
        long placedStudents = adminStudents.stream()
                .filter(s -> s.getPlacementStatus() == Student.PlacementStatus.PLACED)
                .count();
        long eligibleStudents = adminStudents.stream()
                .filter(s -> s.getPlacementStatus() == Student.PlacementStatus.ELIGIBLE || 
                            s.getPlacementStatus() == Student.PlacementStatus.IN_PROCESS)
                .count();
        
        double averageGpa = adminStudents.stream()
                .filter(s -> s.getGpa() != null)
                .mapToDouble(s -> s.getGpa().doubleValue())
                .average()
                .orElse(0.0);

        return Map.of(
                "totalStudents", totalStudents,
                "placedStudents", placedStudents,
                "eligibleStudents", eligibleStudents,
                "averageGPA", Math.round(averageGpa * 100.0) / 100.0,
                "placementRate", totalStudents > 0 ? (placedStudents * 100.0 / totalStudents) : 0.0
        );
    }
}
