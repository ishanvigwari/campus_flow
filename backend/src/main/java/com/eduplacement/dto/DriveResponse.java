package com.eduplacement.dto;

import com.eduplacement.entity.Drive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DriveResponse {
    private Long id;
    private Long companyId;
    private String companyName;
    private String roleTitle;
    private String description;
    private String requiredSkills;
    private BigDecimal minGpa;
    private BigDecimal packageMin;
    private BigDecimal packageMax;
    private Integer totalApplicants;
    private Integer shortlistedCount;
    private String status;
    private LocalDate driveDate;
    private LocalDate applicationDeadline;
    private String eligibleBatches;
    private String eligibleMajors;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DriveResponse fromEntity(Drive drive) {
        DriveResponse response = new DriveResponse();
        response.setId(drive.getId());
        if (drive.getCompany() != null) {
            response.setCompanyId(drive.getCompany().getId());
            response.setCompanyName(drive.getCompany().getName());
        }
        response.setRoleTitle(drive.getRoleTitle());
        response.setDescription(drive.getDescription());
        response.setRequiredSkills(drive.getRequiredSkills());
        response.setMinGpa(drive.getMinGpa());
        response.setPackageMin(drive.getPackageMin());
        response.setPackageMax(drive.getPackageMax());
        response.setTotalApplicants(drive.getTotalApplicants());
        response.setShortlistedCount(drive.getShortlistedCount());
        response.setStatus(drive.getStatus() != null ? drive.getStatus().name() : null);
        response.setDriveDate(drive.getDriveDate());
        response.setApplicationDeadline(drive.getApplicationDeadline());
        response.setEligibleBatches(drive.getEligibleBatches());
        response.setEligibleMajors(drive.getEligibleMajors());
        response.setCreatedAt(drive.getCreatedAt());
        response.setUpdatedAt(drive.getUpdatedAt());
        return response;
    }
}
