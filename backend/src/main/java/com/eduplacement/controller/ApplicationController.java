package com.eduplacement.controller;

import com.eduplacement.dto.ApplicationResponse;
import com.eduplacement.entity.Application;
import com.eduplacement.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        List<ApplicationResponse> applications = applicationService.getAllApplications().stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApplicationResponse> getApplicationById(@PathVariable Long id) {
        Application application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(ApplicationResponse.fromEntity(application));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByStudent(@PathVariable Long studentId) {
        List<ApplicationResponse> applications = applicationService.getApplicationsByStudent(studentId).stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/drive/{driveId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByDrive(@PathVariable Long driveId) {
        List<ApplicationResponse> applications = applicationService.getApplicationsByDrive(driveId).stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByStatus(@PathVariable Application.ApplicationStatus status) {
        List<ApplicationResponse> applications = applicationService.getApplicationsByStatus(status).stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(applicationService.getApplicationStatistics());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApplicationResponse> createApplication(@RequestBody Application application) {
        Application created = applicationService.createApplication(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApplicationResponse.fromEntity(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApplicationResponse> updateApplication(@PathVariable Long id, @RequestBody Application application) {
        Application updated = applicationService.updateApplication(id, application);
        return ResponseEntity.ok(ApplicationResponse.fromEntity(updated));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        Application updated = applicationService.updateApplicationStatus(id, Application.ApplicationStatus.valueOf(status));
        return ResponseEntity.ok(ApplicationResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
