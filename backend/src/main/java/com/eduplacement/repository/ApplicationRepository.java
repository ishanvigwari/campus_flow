package com.eduplacement.repository;

import com.eduplacement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    List<Application> findByStudentId(Long studentId);
    
    List<Application> findByDriveId(Long driveId);
    
    List<Application> findByStatus(Application.ApplicationStatus status);
    
    Optional<Application> findByStudentIdAndDriveId(Long studentId, Long driveId);
    
    @Query("SELECT a FROM Application a WHERE a.student.id = :studentId AND a.status = :status")
    List<Application> findByStudentIdAndStatus(@Param("studentId") Long studentId, 
                                               @Param("status") Application.ApplicationStatus status);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.drive.id = :driveId AND a.status = :status")
    Long countByDriveIdAndStatus(@Param("driveId") Long driveId, 
                                  @Param("status") Application.ApplicationStatus status);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = :status")
    Long countByStatus(@Param("status") Application.ApplicationStatus status);
    
    @Query("SELECT a FROM Application a WHERE a.student.id = :studentId ORDER BY a.appliedAt DESC")
    List<Application> findRecentApplicationsByStudent(@Param("studentId") Long studentId);
    
    Boolean existsByStudentIdAndDriveId(Long studentId, Long driveId);
}
