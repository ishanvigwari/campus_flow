package com.eduplacement.controller;

import com.eduplacement.dto.StudentRegistrationRequest;
import com.eduplacement.dto.StudentResponse;
import com.eduplacement.entity.Student;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentResponse> getCurrentStudent(Authentication authentication) {
        String email = authentication.getName();
        Student student = studentService.getStudentByEmail(email);
        return ResponseEntity.ok(StudentResponse.fromEntity(student));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentResponse>> getAllStudents(Authentication authentication) {
        String adminEmail = authentication.getName();
        List<Student> students = studentService.getStudentsByAdmin(adminEmail);
        List<StudentResponse> responses = students.stream()
                .map(StudentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(StudentResponse.fromEntity(student));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentResponse> getStudentByUserId(@PathVariable Long userId) {
        Student student = studentService.getStudentByUserId(userId);
        return ResponseEntity.ok(StudentResponse.fromEntity(student));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentResponse>> searchStudents(@RequestParam String keyword, Authentication authentication) {
        String adminEmail = authentication.getName();
        List<Student> students = studentService.searchStudents(keyword).stream()
                .filter(s -> adminEmail.equals(s.getCreatedBy()))
                .collect(Collectors.toList());
        List<StudentResponse> responses = students.stream()
                .map(StudentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentResponse>> getStudentsByStatus(@PathVariable Student.PlacementStatus status) {
        List<Student> students = studentService.getStudentsByStatus(status);
        List<StudentResponse> responses = students.stream()
                .map(StudentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/batch/{batch}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentResponse>> getStudentsByBatch(@PathVariable String batch) {
        List<Student> students = studentService.getStudentsByBatch(batch);
        List<StudentResponse> responses = students.stream()
                .map(StudentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatistics(Authentication authentication) {
        String adminEmail = authentication.getName();
        return ResponseEntity.ok(studentService.getStudentStatisticsByAdmin(adminEmail));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentResponse> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(StudentResponse.fromEntity(created));
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentResponse> registerStudent(@RequestBody StudentRegistrationRequest request, Authentication authentication) {
        String adminEmail = authentication.getName();
        Student created = studentService.registerStudent(request, adminEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(StudentResponse.fromEntity(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student updated = studentService.updateStudent(id, student);
        return ResponseEntity.ok(StudentResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
