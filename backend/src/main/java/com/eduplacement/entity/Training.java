package com.eduplacement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trainings")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrainingType type;

    @Column(nullable = false)
    private String instructor;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "duration_hours")
    private Integer durationHours;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "enrolled_count")
    private Integer enrolledCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrainingStatus status = TrainingStatus.UPCOMING;

    @Column(columnDefinition = "TEXT")
    private String materials;

    @OneToMany(mappedBy = "training", cascade = CascadeType.ALL)
    private List<TrainingEnrollment> enrollments = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum TrainingType {
        WORKSHOP,
        COURSE,
        SEMINAR,
        BOOTCAMP,
        CERTIFICATION
    }

    public enum TrainingStatus {
        UPCOMING,
        ONGOING,
        COMPLETED,
        CANCELLED
    }
}
