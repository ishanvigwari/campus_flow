package com.eduplacement.repository;

import com.eduplacement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    Optional<Project> findByProjectCode(String projectCode);
    
    List<Project> findByStudentId(Long studentId);
    
    List<Project> findByMentorName(String mentorName);
    
    List<Project> findByStatus(Project.ProjectStatus status);
    
    @Query("SELECT p FROM Project p WHERE p.status = :status ORDER BY p.progressPercentage DESC")
    List<Project> findByStatusOrderByProgress(@Param("status") Project.ProjectStatus status);
    
    @Query("SELECT COUNT(p) FROM Project p WHERE p.status = :status")
    Long countByStatus(@Param("status") Project.ProjectStatus status);
    
    @Query("SELECT p.mentorName, COUNT(p) FROM Project p GROUP BY p.mentorName")
    List<Object[]> getMentorWorkload();
    
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.projectCode) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Project> searchProjects(@Param("keyword") String keyword);
}
