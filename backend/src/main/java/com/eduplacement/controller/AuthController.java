package com.eduplacement.controller;

import com.eduplacement.dto.AuthResponse;
import com.eduplacement.dto.GoogleAuthRequest;
import com.eduplacement.dto.LoginRequest;
import com.eduplacement.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for user: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
        log.info("Google auth attempt for role: {}", request.getRole());
        AuthResponse response = authService.googleAuth(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google-login")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> request) {
        String idToken = request.get("idToken");
        String role = request.get("role");
        
        if (idToken == null || role == null) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Google login attempt for role: {}", role);
        AuthResponse response = authService.googleLogin(idToken, role);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "EduPlacement Pro API"));
    }
}
