package com.eduplacement.service;

import com.eduplacement.entity.Project;
import com.eduplacement.entity.ProjectUpdate;
import com.eduplacement.entity.User;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.repository.ProjectRepository;
import com.eduplacement.repository.ProjectUpdateRepository;
import com.eduplacement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectUpdateService {

    private final ProjectUpdateRepository projectUpdateRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<ProjectUpdate> getProjectUpdates(Long projectId) {
        return projectUpdateRepository.findByProjectIdOrderByCreatedAtAsc(projectId);
    }

    @Transactional
    public ProjectUpdate createUpdate(Long projectId, String updateText, Integer progressPercentage,
                                      ProjectUpdate.UpdateType updateType, String userEmail) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        ProjectUpdate update = new ProjectUpdate();
        update.setProject(project);
        update.setUpdateText(updateText);
        update.setProgressPercentage(progressPercentage);
        update.setUpdateType(updateType != null ? updateType : ProjectUpdate.UpdateType.PROGRESS);
        update.setPostedBy(userEmail);
        update.setPostedByName(user.getName());

        // Also sync the project's overall progress percentage
        if (progressPercentage != null) {
            project.setProgressPercentage(progressPercentage);
            projectRepository.save(project);
        }

        ProjectUpdate saved = projectUpdateRepository.save(update);
        log.info("Project update created for project {} by {}", projectId, userEmail);
        return saved;
    }

    @Transactional
    public void deleteUpdate(Long updateId) {
        if (!projectUpdateRepository.existsById(updateId)) {
            throw new ResourceNotFoundException("Project update not found with id: " + updateId);
        }
        projectUpdateRepository.deleteById(updateId);
    }
}
