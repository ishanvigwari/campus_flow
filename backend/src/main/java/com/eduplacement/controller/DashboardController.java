package com.eduplacement.controller;

import com.eduplacement.service.ApplicationService;
import com.eduplacement.service.DriveService;
import com.eduplacement.service.ProjectService;
import com.eduplacement.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class DashboardController {

    private final StudentService studentService;
    private final ProjectService projectService;
    private final DriveService driveService;
    private final ApplicationService applicationService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        dashboard.put("students", studentService.getStudentStatistics());
        dashboard.put("projects", projectService.getProjectStatistics());
        dashboard.put("drives", driveService.getDriveStatistics());
        dashboard.put("applications", applicationService.getApplicationStatistics());
        
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, Object>> getStudentDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        // Add student-specific dashboard data
        dashboard.put("message", "Student dashboard data");
        
        return ResponseEntity.ok(dashboard);
    }
}
