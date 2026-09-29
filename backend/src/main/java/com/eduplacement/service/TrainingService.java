package com.eduplacement.service;

import com.eduplacement.entity.Training;
import com.eduplacement.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrainingService {

    private final TrainingRepository trainingRepository;

    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public Training getTrainingById(Long id) {
        return trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found with id: " + id));
    }

    public List<Training> getUpcomingTrainings() {
        return trainingRepository.findUpcomingTrainings(LocalDate.now(), Training.TrainingStatus.UPCOMING);
    }

    public List<Training> searchTrainings(String keyword) {
        return trainingRepository.searchTrainings(keyword);
    }

    @Transactional
    public Training createTraining(Training training) {
        return trainingRepository.save(training);
    }

    @Transactional
    public Training updateTraining(Long id, Training trainingDetails) {
        Training training = getTrainingById(id);

        if (trainingDetails.getTitle() != null) training.setTitle(trainingDetails.getTitle());
        if (trainingDetails.getDescription() != null) training.setDescription(trainingDetails.getDescription());
        if (trainingDetails.getType() != null) training.setType(trainingDetails.getType());
        if (trainingDetails.getInstructor() != null) training.setInstructor(trainingDetails.getInstructor());
        if (trainingDetails.getStartDate() != null) training.setStartDate(trainingDetails.getStartDate());
        if (trainingDetails.getEndDate() != null) training.setEndDate(trainingDetails.getEndDate());
        if (trainingDetails.getDurationHours() != null) training.setDurationHours(trainingDetails.getDurationHours());
        if (trainingDetails.getMaxParticipants() != null) training.setMaxParticipants(trainingDetails.getMaxParticipants());
        if (trainingDetails.getEnrolledCount() != null) training.setEnrolledCount(trainingDetails.getEnrolledCount());
        if (trainingDetails.getStatus() != null) training.setStatus(trainingDetails.getStatus());
        if (trainingDetails.getMaterials() != null) training.setMaterials(trainingDetails.getMaterials());

        return trainingRepository.save(training);
    }

    @Transactional
    public void deleteTraining(Long id) {
        Training training = getTrainingById(id);
        trainingRepository.delete(training);
    }
}
