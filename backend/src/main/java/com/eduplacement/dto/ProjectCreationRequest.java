package com.eduplacement.dto;

import com.eduplacement.entity.Project;
import lombok.Data;

@Data
public class ProjectCreationRequest {
    private String title;
    private String description;
    private String studentEmail;
    private String guide;
    private Integer completionPercentage;
    private Project.ProjectStatus status;
}
