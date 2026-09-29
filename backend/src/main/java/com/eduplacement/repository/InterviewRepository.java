package com.eduplacement.repository;

import com.eduplacement.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    
    List<Interview> findByStudentId(Long studentId);
    
    List<Interview> findByApplicationId(Long applicationId);
    
    List<Interview> findByStatus(Interview.InterviewStatus status);
    
    @Query("SELECT i FROM Interview i WHERE i.student.id = :studentId AND i.interviewDate >= :startDate ORDER BY i.interviewDate ASC")
    List<Interview> findUpcomingInterviewsByStudent(@Param("studentId") Long studentId, 
                                                     @Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT i FROM Interview i WHERE i.interviewDate BETWEEN :startDate AND :endDate ORDER BY i.interviewDate ASC")
    List<Interview> findByInterviewDateBetween(@Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(i) FROM Interview i WHERE i.status = :status")
    Long countByStatus(@Param("status") Interview.InterviewStatus status);
    
    @Query("SELECT i FROM Interview i WHERE i.interviewDate >= :today AND i.status = 'SCHEDULED' ORDER BY i.interviewDate ASC")
    List<Interview> findScheduledInterviews(@Param("today") LocalDateTime today);
}
