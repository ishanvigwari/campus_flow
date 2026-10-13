package com.eduplacement.controller;

import com.eduplacement.dto.ProjectCreationRequest;
import com.eduplacement.dto.ProjectResponse;
import com.eduplacement.entity.Project;
import com.eduplacement.entity.ProjectComment;
import com.eduplacement.entity.ProjectUpdate;
import com.eduplacement.entity.Student;
import com.eduplacement.repository.ProjectCommentRepository;
import com.eduplacement.repository.ProjectUpdateRepository;
import com.eduplacement.service.ProjectService;
import com.eduplacement.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ProjectController {

    private final ProjectService projectService;
    private final StudentService studentService;
    private final ProjectUpdateRepository projectUpdateRepository;
    private final ProjectCommentRepository projectCommentRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ProjectResponse>> getAllProjects(Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        List<Project> projects = "ROLE_ADMIN".equals(role)
                ? projectService.getProjectsByAdmin(authentication.getName())
                : projectService.getAllProjects();
        List<ProjectResponse> responses = projects.stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(ProjectResponse.fromEntity(projectService.getProjectById(id)));
    }

    /** Full detail view — includes updates and comments in one call */
    @GetMapping("/{id}/details")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ProjectResponse> getProjectDetails(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        ProjectResponse response = ProjectResponse.fromEntity(project);
        List<ProjectUpdate> updates = projectUpdateRepository.findByProjectIdOrderByCreatedAtAsc(id);
        List<ProjectComment> comments = projectCommentRepository.findByProjectIdOrderByCreatedAtAsc(id);
        response.setUpdates(updates);
        response.setComments(comments);
        response.setTotalUpdates(updates.size());
        response.setTotalComments(comments.size());
        return ResponseEntity.ok(response);
    }

    /** Student fetches their own projects */
    @GetMapping("/my-projects")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication authentication) {
        String email = authentication.getName();
        Student student = studentService.getStudentByEmail(email);
        List<ProjectResponse> responses = projectService.getProjectsByStudent(student.getId()).stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStudent(@PathVariable Long studentId) {
        List<ProjectResponse> responses = projectService.getProjectsByStudent(studentId).stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProjectResponse>> searchProjects(@RequestParam String keyword) {
        List<ProjectResponse> responses = projectService.searchProjects(keyword).stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStatus(@PathVariable Project.ProjectStatus status) {
        List<ProjectResponse> responses = projectService.getProjectsByStatus(status).stream()
                .map(ProjectResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatistics(Authentication authentication) {
        return ResponseEntity.ok(projectService.getProjectStatisticsByAdmin(authentication.getName()));
    }

    /** Alias — frontend calls /projects/stats */
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats(Authentication authentication) {
        return ResponseEntity.ok(projectService.getProjectStatisticsByAdmin(authentication.getName()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ProjectResponse> createProject(@RequestBody ProjectCreationRequest request) {
        Project created = projectService.createProjectFromEmail(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ProjectResponse.fromEntity(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id, @RequestBody Project project) {
        return ResponseEntity.ok(ProjectResponse.fromEntity(projectService.updateProject(id, project)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
