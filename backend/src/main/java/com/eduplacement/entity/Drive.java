package com.eduplacement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drives")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Drive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "role_title", nullable = false)
    private String roleTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills;

    @Column(name = "min_gpa", precision = 3, scale = 2)
    private BigDecimal minGpa;

    @Column(name = "package_min", precision = 10, scale = 2)
    private BigDecimal packageMin;

    @Column(name = "package_max", precision = 10, scale = 2)
    private BigDecimal packageMax;

    @Column(name = "total_applicants")
    private Integer totalApplicants = 0;

    @Column(name = "shortlisted_count")
    private Integer shortlistedCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DriveStatus status = DriveStatus.UPCOMING;

    @Column(name = "drive_date")
    private LocalDate driveDate;

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @Column(name = "eligible_batches")
    private String eligibleBatches;

    @Column(name = "eligible_majors")
    private String eligibleMajors;

    @OneToMany(mappedBy = "drive", cascade = CascadeType.ALL)
    private List<Application> applications = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum DriveStatus {
        UPCOMING,
        ONGOING,
        SHORTLISTING,
        COMPLETED,
        CANCELLED
    }
}
