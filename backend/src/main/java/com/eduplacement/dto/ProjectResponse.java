package com.eduplacement.dto;

import com.eduplacement.entity.Project;
import com.eduplacement.entity.ProjectComment;
import com.eduplacement.entity.ProjectUpdate;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectResponse {
    private Long id;
    private String projectCode;
    private String title;
    private String description;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String mentorName;
    private Integer progressPercentage;
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String githubUrl;
    private String technologies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Populated separately when loading details
    private List<ProjectUpdate> updates;
    private List<ProjectComment> comments;
    private Integer totalUpdates;
    private Integer totalComments;

    public static ProjectResponse fromEntity(Project project) {
        ProjectResponse r = new ProjectResponse();
        r.setId(project.getId());
        r.setProjectCode(project.getProjectCode());
        r.setTitle(project.getTitle());
        r.setDescription(project.getDescription());
        if (project.getStudent() != null) {
            r.setStudentId(project.getStudent().getId());
            if (project.getStudent().getUser() != null) {
                r.setStudentName(project.getStudent().getUser().getName());
                r.setStudentEmail(project.getStudent().getUser().getEmail());
            }
        }
        r.setMentorName(project.getMentorName());
        r.setProgressPercentage(project.getProgressPercentage());
        r.setStatus(project.getStatus() != null ? project.getStatus().name() : null);
        r.setStartDate(project.getStartDate());
        r.setEndDate(project.getEndDate());
        r.setGithubUrl(project.getGithubUrl());
        r.setTechnologies(project.getTechnologies());
        r.setCreatedAt(project.getCreatedAt());
        r.setUpdatedAt(project.getUpdatedAt());
        return r;
    }
}
