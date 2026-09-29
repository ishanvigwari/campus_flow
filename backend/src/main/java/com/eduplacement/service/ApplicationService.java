package com.eduplacement.service;

import com.eduplacement.entity.Application;
import com.eduplacement.repository.ApplicationRepository;
import com.eduplacement.repository.DriveRepository;
import com.eduplacement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final DriveRepository driveRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<Application> getApplicationsByDrive(Long driveId) {
        return applicationRepository.findByDriveId(driveId);
    }

    public List<Application> getApplicationsByStatus(Application.ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    @Transactional
    public Application createApplication(Application application) {
        // Validate student and drive exist
        studentRepository.findById(application.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        driveRepository.findById(application.getDrive().getId())
                .orElseThrow(() -> new RuntimeException("Drive not found"));

        // Check if student already applied to this drive
        if (applicationRepository.existsByStudentIdAndDriveId(
                application.getStudent().getId(), 
                application.getDrive().getId())) {
            throw new RuntimeException("Student has already applied to this drive");
        }

        application.setAppliedAt(LocalDateTime.now());
        return applicationRepository.save(application);
    }

    @Transactional
    public Application updateApplication(Long id, Application applicationDetails) {
        Application application = getApplicationById(id);

        if (applicationDetails.getStatus() != null) application.setStatus(applicationDetails.getStatus());
        if (applicationDetails.getResumeUrl() != null) application.setResumeUrl(applicationDetails.getResumeUrl());
        if (applicationDetails.getCoverLetter() != null) application.setCoverLetter(applicationDetails.getCoverLetter());
        if (applicationDetails.getNotes() != null) application.setNotes(applicationDetails.getNotes());

        return applicationRepository.save(application);
    }

    @Transactional
    public void deleteApplication(Long id) {
        Application application = getApplicationById(id);
        applicationRepository.delete(application);
    }

    public Map<String, Object> getApplicationStatistics() {
        Long totalApplications = applicationRepository.count();
        Long activeApplications = applicationRepository.countByStatus(Application.ApplicationStatus.APPLIED);
        Long shortlistedApplications = applicationRepository.countByStatus(Application.ApplicationStatus.SHORTLISTED);
        Long selectedApplications = applicationRepository.countByStatus(Application.ApplicationStatus.SELECTED);

        return Map.of(
                "totalApplications", totalApplications,
                "activeApplications", activeApplications,
                "shortlistedApplications", shortlistedApplications,
                "selectedApplications", selectedApplications
        );
    }
}
