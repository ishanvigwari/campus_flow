package com.eduplacement.repository;

import com.eduplacement.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    Optional<Company> findByName(String name);
    
    List<Company> findByIndustry(String industry);
    
    List<Company> findByActiveTrue();
    
    @Query("SELECT c FROM Company c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(c.industry) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Company> searchCompanies(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(c) FROM Company c WHERE c.active = true")
    Long countActiveCompanies();
}
