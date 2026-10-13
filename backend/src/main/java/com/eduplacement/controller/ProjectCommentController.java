package com.eduplacement.controller;

import com.eduplacement.entity.ProjectComment;
import com.eduplacement.service.ProjectCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project-comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ProjectCommentController {

    private final ProjectCommentService projectCommentService;

    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ProjectComment>> getProjectComments(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectCommentService.getProjectComments(projectId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ProjectComment> createComment(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        String email = authentication.getName();
        Long projectId = Long.valueOf(request.get("projectId").toString());
        String commentText = (String) request.get("commentText");
        ProjectComment saved = projectCommentService.createComment(projectId, commentText, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        projectCommentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
