package com.eduplacement.controller;

import com.eduplacement.entity.ProjectUpdate;
import com.eduplacement.service.ProjectUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project-updates")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ProjectUpdateController {

    private final ProjectUpdateService projectUpdateService;

    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ProjectUpdate>> getProjectUpdates(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectUpdateService.getProjectUpdates(projectId));
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ProjectUpdate> createUpdate(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        String email = authentication.getName();
        Long projectId = Long.valueOf(request.get("projectId").toString());
        String updateText = (String) request.get("updateText");
        Integer progressPercentage = request.get("progressPercentage") != null
                ? Integer.valueOf(request.get("progressPercentage").toString()) : null;
        ProjectUpdate.UpdateType updateType;
        try {
            updateType = ProjectUpdate.UpdateType.valueOf(
                    request.getOrDefault("updateType", "PROGRESS").toString());
        } catch (IllegalArgumentException e) {
            updateType = ProjectUpdate.UpdateType.PROGRESS;
        }
        ProjectUpdate saved = projectUpdateService.createUpdate(
                projectId, updateText, progressPercentage, updateType, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Void> deleteUpdate(@PathVariable Long id) {
        projectUpdateService.deleteUpdate(id);
        return ResponseEntity.noContent().build();
    }
}
