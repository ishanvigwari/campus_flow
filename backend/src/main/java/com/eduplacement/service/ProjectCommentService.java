package com.eduplacement.service;

import com.eduplacement.entity.Project;
import com.eduplacement.entity.ProjectComment;
import com.eduplacement.entity.User;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.repository.ProjectCommentRepository;
import com.eduplacement.repository.ProjectRepository;
import com.eduplacement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectCommentService {

    private final ProjectCommentRepository projectCommentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<ProjectComment> getProjectComments(Long projectId) {
        return projectCommentRepository.findByProjectIdOrderByCreatedAtAsc(projectId);
    }

    @Transactional
    public ProjectComment createComment(Long projectId, String commentText, String userEmail) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        ProjectComment comment = new ProjectComment();
        comment.setProject(project);
        comment.setCommentText(commentText);
        comment.setCommentedBy(userEmail);
        comment.setCommentedByName(user.getName());
        comment.setCommentedByRole(user.getRole().name());

        ProjectComment saved = projectCommentRepository.save(comment);
        log.info("Comment added to project {} by {} ({})", projectId, userEmail, user.getRole());
        return saved;
    }

    @Transactional
    public void deleteComment(Long commentId) {
        if (!projectCommentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Project comment not found with id: " + commentId);
        }
        projectCommentRepository.deleteById(commentId);
    }
}
