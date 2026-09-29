package com.eduplacement.service;

import com.eduplacement.dto.AuthResponse;
import com.eduplacement.dto.GoogleAuthRequest;
import com.eduplacement.dto.LoginRequest;
import com.eduplacement.entity.User;
import com.eduplacement.exception.BadRequestException;
import com.eduplacement.exception.ResourceNotFoundException;
import com.eduplacement.exception.UnauthorizedException;
import com.eduplacement.repository.UserRepository;
import com.eduplacement.security.GoogleTokenVerifier;
import com.eduplacement.security.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final GoogleTokenVerifier googleTokenVerifier;

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getActive()) {
            throw new UnauthorizedException("User account is deactivated");
        }

        if (user.getPasswordHash() == null) {
            throw new BadRequestException("Please use Google sign-in for this account");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .userId(user.getId())
                .profilePicture(user.getProfilePicture())
                .build();
    }

    @Transactional
    public AuthResponse googleAuth(GoogleAuthRequest request) {
        try {
            // Note: The frontend sends access_token, we need to fetch user info
            // For now, we'll verify using Google ID token if provided
            // In production, validate the access token properly
            
            throw new UnsupportedOperationException("Google OAuth not fully implemented. Use /auth/google-login endpoint with idToken");
            
        } catch (Exception e) {
            log.error("Google authentication failed", e);
            throw new BadRequestException("Google authentication failed: " + e.getMessage());
        }
    }

    @Transactional
    public AuthResponse googleLogin(String idToken, String role) {
        try {
            GoogleIdToken.Payload payload = googleTokenVerifier.verify(idToken);
            
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");
            String googleId = payload.getSubject();

            User user = userRepository.findByGoogleId(googleId)
                    .orElseGet(() -> userRepository.findByEmail(email)
                            .orElse(null));

            if (user == null) {
                // Create new user
                user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setProfilePicture(picture);
                user.setGoogleId(googleId);
                user.setRole(User.Role.valueOf(role.toUpperCase()));
                user.setActive(true);
                user = userRepository.save(user);
                log.info("Created new user from Google OAuth: {}", email);
            } else {
                // Update existing user
                if (user.getGoogleId() == null) {
                    user.setGoogleId(googleId);
                }
                user.setProfilePicture(picture);
                user = userRepository.save(user);
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

            return AuthResponse.builder()
                    .token(token)
                    .email(user.getEmail())
                    .name(user.getName())
                    .role(user.getRole().name())
                    .userId(user.getId())
                    .profilePicture(user.getProfilePicture())
                    .build();

        } catch (Exception e) {
            log.error("Google login failed", e);
            throw new BadRequestException("Google login failed: " + e.getMessage());
        }
    }
}
