package com.eduplacement.repository;

import com.eduplacement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByStudentId(String studentId);
    
    Optional<Student> findByUserId(Long userId);
    
    List<Student> findByBatch(String batch);
    
    List<Student> findByMajor(String major);
    
    List<Student> findByPlacementStatus(Student.PlacementStatus status);
    
    @Query("SELECT s FROM Student s WHERE s.batch = :batch AND s.placementStatus = :status")
    List<Student> findByBatchAndStatus(@Param("batch") String batch, 
                                       @Param("status") Student.PlacementStatus status);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.placementStatus = :status")
    Long countByPlacementStatus(@Param("status") Student.PlacementStatus status);
    
    @Query("SELECT AVG(s.gpa) FROM Student s")
    Double getAverageGpa();
    
    @Query("SELECT s FROM Student s WHERE LOWER(s.user.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(s.studentId) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Student> searchStudents(@Param("keyword") String keyword);
}
