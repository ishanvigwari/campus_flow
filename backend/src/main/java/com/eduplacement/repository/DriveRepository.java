package com.eduplacement.repository;

import com.eduplacement.entity.Drive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DriveRepository extends JpaRepository<Drive, Long> {
    
    List<Drive> findByCompanyId(Long companyId);
    
    List<Drive> findByStatus(Drive.DriveStatus status);
    
    List<Drive> findByStatusOrderByDriveDateDesc(Drive.DriveStatus status);
    
    @Query("SELECT d FROM Drive d WHERE d.driveDate BETWEEN :startDate AND :endDate")
    List<Drive> findByDriveDateBetween(@Param("startDate") LocalDate startDate, 
                                       @Param("endDate") LocalDate endDate);
    
    @Query("SELECT d FROM Drive d WHERE d.applicationDeadline >= :today AND d.status = :status")
    List<Drive> findActiveWithOpenApplications(@Param("today") LocalDate today, 
                                               @Param("status") Drive.DriveStatus status);
    
    @Query("SELECT COUNT(d) FROM Drive d WHERE d.status = :status")
    Long countByStatus(@Param("status") Drive.DriveStatus status);
    
    @Query("SELECT d FROM Drive d WHERE LOWER(d.roleTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(d.company.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Drive> searchDrives(@Param("keyword") String keyword);
    
    @Query("SELECT AVG(d.packageMax) FROM Drive d WHERE d.status = 'COMPLETED'")
    Double getAveragePackage();
}
