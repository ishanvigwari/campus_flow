package com.eduplacement.repository;

import com.eduplacement.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
    
    List<Training> findByType(Training.TrainingType type);
    
    List<Training> findByStatus(Training.TrainingStatus status);
    
    List<Training> findByInstructor(String instructor);
    
    @Query("SELECT t FROM Training t WHERE t.startDate >= :today AND t.status = :status ORDER BY t.startDate ASC")
    List<Training> findUpcomingTrainings(@Param("today") LocalDate today, 
                                        @Param("status") Training.TrainingStatus status);
    
    @Query("SELECT t FROM Training t WHERE t.startDate BETWEEN :startDate AND :endDate")
    List<Training> findByDateRange(@Param("startDate") LocalDate startDate, 
                                   @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(t) FROM Training t WHERE t.status = :status")
    Long countByStatus(@Param("status") Training.TrainingStatus status);
    
    @Query("SELECT t FROM Training t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(t.instructor) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Training> searchTrainings(@Param("keyword") String keyword);
}
