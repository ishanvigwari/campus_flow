package com.eduplacement.service;

import com.eduplacement.entity.Interview;
import com.eduplacement.repository.ApplicationRepository;
import com.eduplacement.repository.InterviewRepository;
import com.eduplacement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview getInterviewById(Long id) {
        return interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found with id: " + id));
    }

    public List<Interview> getInterviewsByStudent(Long studentId) {
        return interviewRepository.findByStudentId(studentId);
    }

    public List<Interview> getUpcomingInterviewsByStudent(Long studentId) {
        return interviewRepository.findUpcomingInterviewsByStudent(studentId, LocalDateTime.now());
    }

    public List<Interview> getScheduledInterviews() {
        return interviewRepository.findScheduledInterviews(LocalDateTime.now());
    }

    @Transactional
    public Interview createInterview(Interview interview) {
        // Validate application and student exist
        applicationRepository.findById(interview.getApplication().getId())
                .orElseThrow(() -> new RuntimeException("Application not found"));
        studentRepository.findById(interview.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return interviewRepository.save(interview);
    }

    @Transactional
    public Interview updateInterview(Long id, Interview interviewDetails) {
        Interview interview = getInterviewById(id);

        if (interviewDetails.getInterviewDate() != null) interview.setInterviewDate(interviewDetails.getInterviewDate());
        if (interviewDetails.getInterviewType() != null) interview.setInterviewType(interviewDetails.getInterviewType());
        if (interviewDetails.getLocation() != null) interview.setLocation(interviewDetails.getLocation());
        if (interviewDetails.getStatus() != null) interview.setStatus(interviewDetails.getStatus());
        if (interviewDetails.getInterviewerName() != null) interview.setInterviewerName(interviewDetails.getInterviewerName());
        if (interviewDetails.getFeedback() != null) interview.setFeedback(interviewDetails.getFeedback());
        if (interviewDetails.getRating() != null) interview.setRating(interviewDetails.getRating());
        if (interviewDetails.getNotes() != null) interview.setNotes(interviewDetails.getNotes());

        return interviewRepository.save(interview);
    }

    @Transactional
    public void deleteInterview(Long id) {
        Interview interview = getInterviewById(id);
        interviewRepository.delete(interview);
    }
}
