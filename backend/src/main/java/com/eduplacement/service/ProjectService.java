package com.eduplacement.service;

import com.eduplacement.entity.Project;
import com.eduplacement.repository.ProjectRepository;
import com.eduplacement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final StudentRepository studentRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public List<Project> getProjectsByStudent(Long studentId) {
        return projectRepository.findByStudentId(studentId);
    }

    public List<Project> searchProjects(String keyword) {
        return projectRepository.searchProjects(keyword);
    }

    public List<Project> getProjectsByStatus(Project.ProjectStatus status) {
        return projectRepository.findByStatus(status);
    }

    @Transactional
    public Project createProject(Project project) {
        // Validate student exists
        studentRepository.findById(project.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProject(Long id, Project projectDetails) {
        Project project = getProjectById(id);

        if (projectDetails.getTitle() != null) project.setTitle(projectDetails.getTitle());
        if (projectDetails.getDescription() != null) project.setDescription(projectDetails.getDescription());
        if (projectDetails.getMentorName() != null) project.setMentorName(projectDetails.getMentorName());
        if (projectDetails.getProgressPercentage() != null) project.setProgressPercentage(projectDetails.getProgressPercentage());
        if (projectDetails.getStatus() != null) project.setStatus(projectDetails.getStatus());
        if (projectDetails.getStartDate() != null) project.setStartDate(projectDetails.getStartDate());
        if (projectDetails.getEndDate() != null) project.setEndDate(projectDetails.getEndDate());
        if (projectDetails.getGithubUrl() != null) project.setGithubUrl(projectDetails.getGithubUrl());
        if (projectDetails.getTechnologies() != null) project.setTechnologies(projectDetails.getTechnologies());

        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }

    public Map<String, Object> getProjectStatistics() {
        Long totalProjects = projectRepository.count();
        Long onTrackProjects = projectRepository.countByStatus(Project.ProjectStatus.ON_TRACK);
        Long completedProjects = projectRepository.countByStatus(Project.ProjectStatus.COMPLETED);
        Long atRiskProjects = projectRepository.countByStatus(Project.ProjectStatus.AT_RISK);

        List<Object[]> mentorWorkload = projectRepository.getMentorWorkload();
        Map<String, Long> mentorStats = mentorWorkload.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));

        return Map.of(
                "totalProjects", totalProjects,
                "onTrackProjects", onTrackProjects,
                "completedProjects", completedProjects,
                "atRiskProjects", atRiskProjects,
                "mentorWorkload", mentorStats
        );
    }
}
