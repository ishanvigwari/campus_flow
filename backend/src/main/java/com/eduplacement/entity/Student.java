package com.eduplacement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnoreProperties({"passwordHash"})
    private User user;

    @Column(name = "student_id", nullable = false, unique = true)
    private String studentId;

    @Column(nullable = false)
    private String major;

    @Column(nullable = false)
    private String batch;

    @Column(precision = 3, scale = 2)
    private BigDecimal gpa;

    @Enumerated(EnumType.STRING)
    @Column(name = "placement_status", nullable = false)
    private PlacementStatus placementStatus = PlacementStatus.ELIGIBLE;

    @Column(name = "training_progress")
    private Integer trainingProgress = 0;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "placed_company")
    private String placedCompany;

    @Column(name = "package_offered", precision = 10, scale = 2)
    private BigDecimal packageOffered;

    @Column(name = "readiness_score")
    private Integer readinessScore = 0;

    @Column(columnDefinition = "TEXT")
    private String biography;
    
    @Column(name = "created_by")
    private String createdBy; // Email of admin who enrolled this student

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Interview> interviews = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum PlacementStatus {
        ELIGIBLE,
        INELIGIBLE,
        IN_PROCESS,
        PLACED
    }
}
