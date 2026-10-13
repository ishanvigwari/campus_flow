package com.eduplacement.controller;

import com.eduplacement.dto.DriveResponse;
import com.eduplacement.entity.Drive;
import com.eduplacement.service.DriveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/drives")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class DriveController {

    private final DriveService driveService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<DriveResponse>> getAllDrives() {
        List<DriveResponse> drives = driveService.getAllDrives().stream()
                .map(DriveResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(drives);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<DriveResponse> getDriveById(@PathVariable Long id) {
        Drive drive = driveService.getDriveById(id);
        return ResponseEntity.ok(DriveResponse.fromEntity(drive));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<DriveResponse>> getDrivesByStatus(@PathVariable Drive.DriveStatus status) {
        List<DriveResponse> drives = driveService.getDrivesByStatus(status).stream()
                .map(DriveResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(drives);
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<DriveResponse>> getActiveDrives() {
        List<DriveResponse> drives = driveService.getActiveDrives().stream()
                .map(DriveResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(drives);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DriveResponse>> searchDrives(@RequestParam String keyword) {
        List<DriveResponse> drives = driveService.searchDrives(keyword).stream()
                .map(DriveResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(drives);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(driveService.getDriveStatistics());
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(driveService.getDriveStatistics());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DriveResponse> createDrive(@RequestBody Drive drive) {
        Drive created = driveService.createDrive(drive);
        return ResponseEntity.status(HttpStatus.CREATED).body(DriveResponse.fromEntity(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DriveResponse> updateDrive(@PathVariable Long id, @RequestBody Drive drive) {
        Drive updated = driveService.updateDrive(id, drive);
        return ResponseEntity.ok(DriveResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }
}
