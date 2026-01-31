package com.orbit.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;
    private Long userId;
    private String username;
    private String role;

    public AuthResponse(String message, Long userId, String username, String role) {
        this.message = message;
        this.userId = userId;
        this.username = username;
        this.role = role;
    }
}
