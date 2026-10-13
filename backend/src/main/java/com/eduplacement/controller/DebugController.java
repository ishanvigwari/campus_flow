package com.eduplacement.controller;

import com.eduplacement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/debug")
@RequiredArgsConstructor
public class DebugController {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final DriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final TrainingRepository trainingRepository;

    @GetMapping("/counts")
    public ResponseEntity<Map<String, Object>> getDatabaseCounts() {
        Map<String, Object> counts = new HashMap<>();
        
        counts.put("users", userRepository.count());
        counts.put("students", studentRepository.count());
        counts.put("projects", projectRepository.count());
        counts.put("companies", companyRepository.count());
        counts.put("drives", driveRepository.count());
        counts.put("applications", applicationRepository.count());
        counts.put("interviews", interviewRepository.count());
        counts.put("trainings", trainingRepository.count());
        counts.put("databaseFile", "backend/data/eduplacement_pro.mv.db");
        
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getDatabaseConfig() {
        Map<String, Object> config = new HashMap<>();
        
        config.put("datasourceUrl", System.getProperty("spring.datasource.url", "Not set via system property"));
        config.put("hibernateDdlAuto", System.getProperty("spring.jpa.hibernate.ddl-auto", "Not set via system property"));
        config.put("activeProfile", System.getProperty("spring.profiles.active", "default"));
        
        return ResponseEntity.ok(config);
    }
}
