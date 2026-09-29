package com.eduplacement.repository;

import com.eduplacement.entity.TrainingEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainingEnrollmentRepository extends JpaRepository<TrainingEnrollment, Long> {
    
    List<TrainingEnrollment> findByTrainingId(Long trainingId);
    
    List<TrainingEnrollment> findByStudentId(Long studentId);
    
    Optional<TrainingEnrollment> findByTrainingIdAndStudentId(Long trainingId, Long studentId);
    
    List<TrainingEnrollment> findByStatus(TrainingEnrollment.EnrollmentStatus status);
    
    @Query("SELECT te FROM TrainingEnrollment te WHERE te.student.id = :studentId AND te.status = :status")
    List<TrainingEnrollment> findByStudentIdAndStatus(@Param("studentId") Long studentId, 
                                                      @Param("status") TrainingEnrollment.EnrollmentStatus status);
    
    @Query("SELECT COUNT(te) FROM TrainingEnrollment te WHERE te.training.id = :trainingId AND te.status != 'DROPPED'")
    Long countActiveEnrollments(@Param("trainingId") Long trainingId);
    
    @Query("SELECT AVG(te.progressPercentage) FROM TrainingEnrollment te WHERE te.student.id = :studentId")
    Double getAverageProgressByStudent(@Param("studentId") Long studentId);
    
    Boolean existsByTrainingIdAndStudentId(Long trainingId, Long studentId);
}
