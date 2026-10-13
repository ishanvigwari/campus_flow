package com.eduplacement.service;

import com.eduplacement.dto.ProjectCreationRequest;
import com.eduplacement.entity.Project;
import com.eduplacement.entity.Student;
import com.eduplacement.entity.User;
import com.eduplacement.exception.BadRequestException;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.repository.ProjectRepository;
import com.eduplacement.repository.StudentRepository;
import com.eduplacement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByAdmin(String adminEmail) {
        return projectRepository.findAll().stream()
                .filter(p -> p.getStudent() != null && adminEmail.equals(p.getStudent().getCreatedBy()))
                .collect(Collectors.toList());
    }

    public Map<String, Object> getProjectStatisticsByAdmin(String adminEmail) {
        List<Project> adminProjects = getProjectsByAdmin(adminEmail);
        long total = adminProjects.size();
        long onTrack = adminProjects.stream().filter(p -> p.getStatus() == Project.ProjectStatus.ON_TRACK).count();
        long completed = adminProjects.stream().filter(p -> p.getStatus() == Project.ProjectStatus.COMPLETED).count();
        long atRisk = adminProjects.stream().filter(p -> p.getStatus() == Project.ProjectStatus.AT_RISK).count();
        long delayed = adminProjects.stream().filter(p -> p.getStatus() == Project.ProjectStatus.DELAYED).count();

        // distinct mentors among this admin's projects
        long activeMentors = adminProjects.stream()
                .map(Project::getMentorName)
                .filter(m -> m != null && !m.isBlank())
                .distinct()
                .count();

        long onTrackPct = total > 0 ? (onTrack * 100 / total) : 0;

        java.util.HashMap<String, Object> result = new java.util.HashMap<>();
        result.put("totalProjects", total);
        result.put("onTrackProjects", onTrack);
        result.put("completedProjects", completed);
        result.put("atRiskProjects", atRisk);
        result.put("delayedProjects", delayed);
        result.put("activeMentors", activeMentors);
        result.put("onTrackPercentage", onTrackPct);
        return result;
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
    public Project createProjectFromEmail(ProjectCreationRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getStudentEmail())
                .orElseThrow(() -> new BadRequestException("No student found with email: " + request.getStudentEmail()));
        
        // Find student by user ID
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Student profile not found for email: " + request.getStudentEmail()));
        
        // Create project
        Project project = new Project();
        project.setProjectCode("PROJ" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setStudent(student);
        project.setMentorName(request.getGuide());
        project.setProgressPercentage(request.getCompletionPercentage() != null ? request.getCompletionPercentage() : 0);
        project.setStatus(request.getStatus() != null ? request.getStatus() : Project.ProjectStatus.ON_TRACK);
        project.setStartDate(LocalDateTime.now());
        
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
        Long delayedProjects = projectRepository.countByStatus(Project.ProjectStatus.DELAYED);

        List<Object[]> mentorWorkload = projectRepository.getMentorWorkload();
        long activeMentors = mentorWorkload.size();
        long onTrackPercentage = totalProjects > 0 ? (onTrackProjects * 100 / totalProjects) : 0;

        Map<String, Long> mentorStats = mentorWorkload.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));

        java.util.HashMap<String, Object> result = new java.util.HashMap<>();
        result.put("totalProjects", totalProjects);
        result.put("onTrackProjects", onTrackProjects);
        result.put("completedProjects", completedProjects);
        result.put("atRiskProjects", atRiskProjects);
        result.put("delayedProjects", delayedProjects);
        result.put("activeMentors", activeMentors);
        result.put("onTrackPercentage", onTrackPercentage);
        result.put("mentorWorkload", mentorStats);
        return result;
    }
}
