package com.eduplacement.dto;

import com.eduplacement.entity.Student;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class StudentResponse {
    private Long id;
    private String studentId;
    private String name;
    private String email;
    private String major;
    private String batch;
    private Integer graduationYear;
    private BigDecimal gpa;
    private String placementStatus;
    private String contactNumber;
    private String placedCompany;
    private BigDecimal packageOffered;
    private Integer readinessScore;
    private Integer trainingProgress;
    private String biography;
    private String createdBy;
    private LocalDateTime createdAt;
    
    public static StudentResponse fromEntity(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setStudentId(student.getStudentId());
        response.setName(student.getUser().getName());
        response.setEmail(student.getUser().getEmail());
        response.setMajor(student.getMajor());
        response.setBatch(student.getBatch());
        // Parse graduationYear from batch string
        try {
            response.setGraduationYear(Integer.parseInt(student.getBatch()));
        } catch (NumberFormatException e) {
            response.setGraduationYear(null);
        }
        response.setGpa(student.getGpa());
        response.setPlacementStatus(student.getPlacementStatus().toString());
        response.setContactNumber(student.getContactNumber());
        response.setPlacedCompany(student.getPlacedCompany());
        response.setPackageOffered(student.getPackageOffered());
        response.setReadinessScore(student.getReadinessScore());
        response.setTrainingProgress(student.getTrainingProgress());
        response.setBiography(student.getBiography());
        response.setCreatedBy(student.getCreatedBy());
        response.setCreatedAt(student.getCreatedAt());
        return response;
    }
}
