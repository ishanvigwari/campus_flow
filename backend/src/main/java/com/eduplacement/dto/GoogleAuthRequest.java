package com.eduplacement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleAuthRequest {
    
    @NotBlank(message = "Access token is required")
    private String accessToken;
    
    @NotBlank(message = "Role is required")
    private String role; // "admin" or "student"
}
