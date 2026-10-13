package com.eduplacement.service;

import com.eduplacement.entity.Drive;
import com.eduplacement.repository.CompanyRepository;
import com.eduplacement.repository.DriveRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DriveService {

    private final DriveRepository driveRepository;
    private final CompanyRepository companyRepository;

    public List<Drive> getAllDrives() {
        return driveRepository.findAll();
    }

    public Drive getDriveById(Long id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found with id: " + id));
    }

    public List<Drive> getDrivesByStatus(Drive.DriveStatus status) {
        return driveRepository.findByStatus(status);
    }

    public List<Drive> getActiveDrives() {
        return driveRepository.findActiveWithOpenApplications(LocalDate.now(), Drive.DriveStatus.ONGOING);
    }

    public List<Drive> searchDrives(String keyword) {
        return driveRepository.searchDrives(keyword);
    }

    @Transactional
    public Drive createDrive(Drive drive) {
        // If company has an id, validate it exists; otherwise look up or create by name
        com.eduplacement.entity.Company company;
        if (drive.getCompany().getId() != null) {
            company = companyRepository.findById(drive.getCompany().getId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
        } else if (drive.getCompany().getName() != null && !drive.getCompany().getName().isBlank()) {
            String name = drive.getCompany().getName().trim();
            company = companyRepository.findByName(name).orElseGet(() -> {
                com.eduplacement.entity.Company newCo = new com.eduplacement.entity.Company();
                newCo.setName(name);
                newCo.setActive(true);
                return companyRepository.save(newCo);
            });
        } else {
            throw new RuntimeException("Company name or id is required");
        }
        drive.setCompany(company);
        return driveRepository.save(drive);
    }

    @Transactional
    public Drive updateDrive(Long id, Drive driveDetails) {
        Drive drive = getDriveById(id);

        if (driveDetails.getRoleTitle() != null) drive.setRoleTitle(driveDetails.getRoleTitle());
        if (driveDetails.getDescription() != null) drive.setDescription(driveDetails.getDescription());
        if (driveDetails.getRequiredSkills() != null) drive.setRequiredSkills(driveDetails.getRequiredSkills());
        if (driveDetails.getMinGpa() != null) drive.setMinGpa(driveDetails.getMinGpa());
        if (driveDetails.getPackageMin() != null) drive.setPackageMin(driveDetails.getPackageMin());
        if (driveDetails.getPackageMax() != null) drive.setPackageMax(driveDetails.getPackageMax());
        if (driveDetails.getTotalApplicants() != null) drive.setTotalApplicants(driveDetails.getTotalApplicants());
        if (driveDetails.getShortlistedCount() != null) drive.setShortlistedCount(driveDetails.getShortlistedCount());
        if (driveDetails.getStatus() != null) drive.setStatus(driveDetails.getStatus());
        if (driveDetails.getDriveDate() != null) drive.setDriveDate(driveDetails.getDriveDate());
        if (driveDetails.getApplicationDeadline() != null) drive.setApplicationDeadline(driveDetails.getApplicationDeadline());
        if (driveDetails.getEligibleBatches() != null) drive.setEligibleBatches(driveDetails.getEligibleBatches());
        if (driveDetails.getEligibleMajors() != null) drive.setEligibleMajors(driveDetails.getEligibleMajors());

        return driveRepository.save(drive);
    }

    @Transactional
    public void deleteDrive(Long id) {
        Drive drive = getDriveById(id);
        driveRepository.delete(drive);
    }

    public Map<String, Object> getDriveStatistics() {
        Long totalDrives = driveRepository.count();
        Long ongoingDrives = driveRepository.countByStatus(Drive.DriveStatus.ONGOING);
        Long upcomingDrives = driveRepository.countByStatus(Drive.DriveStatus.UPCOMING);
        Long completedDrives = driveRepository.countByStatus(Drive.DriveStatus.COMPLETED);
        Long activeDrives = ongoingDrives + upcomingDrives;
        Double averagePackage = driveRepository.getAveragePackage();

        return Map.of(
                "totalDrives", totalDrives,
                "activeDrives", activeDrives,
                "ongoingDrives", ongoingDrives,
                "upcomingDrives", upcomingDrives,
                "completedDrives", completedDrives,
                "averagePackage", averagePackage != null ? averagePackage : 0.0,
                "totalApplications", 0L
        );
    }
}
