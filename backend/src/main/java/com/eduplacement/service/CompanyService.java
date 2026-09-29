package com.eduplacement.service;

import com.eduplacement.entity.Company;
import com.eduplacement.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyService {

    private final CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    public List<Company> getActiveCompanies() {
        return companyRepository.findByActiveTrue();
    }

    public List<Company> searchCompanies(String keyword) {
        return companyRepository.searchCompanies(keyword);
    }

    @Transactional
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    @Transactional
    public Company updateCompany(Long id, Company companyDetails) {
        Company company = getCompanyById(id);

        if (companyDetails.getName() != null) company.setName(companyDetails.getName());
        if (companyDetails.getDescription() != null) company.setDescription(companyDetails.getDescription());
        if (companyDetails.getIndustry() != null) company.setIndustry(companyDetails.getIndustry());
        if (companyDetails.getWebsite() != null) company.setWebsite(companyDetails.getWebsite());
        if (companyDetails.getContactPerson() != null) company.setContactPerson(companyDetails.getContactPerson());
        if (companyDetails.getContactEmail() != null) company.setContactEmail(companyDetails.getContactEmail());
        if (companyDetails.getContactPhone() != null) company.setContactPhone(companyDetails.getContactPhone());
        if (companyDetails.getAddress() != null) company.setAddress(companyDetails.getAddress());
        if (companyDetails.getActive() != null) company.setActive(companyDetails.getActive());

        return companyRepository.save(company);
    }

    @Transactional
    public void deleteCompany(Long id) {
        Company company = getCompanyById(id);
        companyRepository.delete(company);
    }
}
