package com.eduplacement.dto;

import com.eduplacement.entity.Application;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String studentMajor;
    private String studentBatch;
    private java.math.BigDecimal studentGpa;
    private Long driveId;
    private String companyName;
    private String roleTitle;
    private String status;
    private String resumeUrl;
    private String coverLetter;
    private String notes;
    private LocalDateTime appliedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ApplicationResponse fromEntity(Application application) {
        ApplicationResponse response = new ApplicationResponse();
        response.setId(application.getId());
        if (application.getStudent() != null) {
            response.setStudentId(application.getStudent().getId());
            if (application.getStudent().getUser() != null) {
                response.setStudentName(application.getStudent().getUser().getName());
                response.setStudentEmail(application.getStudent().getUser().getEmail());
            }
            response.setStudentMajor(application.getStudent().getMajor());
            response.setStudentBatch(application.getStudent().getBatch());
            response.setStudentGpa(application.getStudent().getGpa());
        }
        if (application.getDrive() != null) {
            response.setDriveId(application.getDrive().getId());
            response.setRoleTitle(application.getDrive().getRoleTitle());
            if (application.getDrive().getCompany() != null) {
                response.setCompanyName(application.getDrive().getCompany().getName());
            }
        }
        response.setStatus(application.getStatus() != null ? application.getStatus().name() : null);
        response.setResumeUrl(application.getResumeUrl());
        response.setCoverLetter(application.getCoverLetter());
        response.setNotes(application.getNotes());
        response.setAppliedAt(application.getAppliedAt());
        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());
        return response;
    }
}
