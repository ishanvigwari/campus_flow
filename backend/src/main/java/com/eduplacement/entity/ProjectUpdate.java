package com.eduplacement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "project_updates")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Project project;

    @Column(name = "project_id", insertable = false, updatable = false)
    private Long projectId;

    @Column(name = "update_text", columnDefinition = "TEXT", nullable = false)
    private String updateText;

    @Column(name = "progress_percentage")
    private Integer progressPercentage;

    @Column(name = "posted_by", nullable = false)
    private String postedBy;

    @Column(name = "posted_by_name")
    private String postedByName;

    @Enumerated(EnumType.STRING)
    @Column(name = "update_type", nullable = false)
    private UpdateType updateType = UpdateType.PROGRESS;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum UpdateType {
        PROGRESS,
        MILESTONE,
        ISSUE,
        COMPLETION
    }
}
