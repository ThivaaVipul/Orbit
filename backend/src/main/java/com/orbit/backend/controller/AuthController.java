package com.orbit.backend.controller;

import com.orbit.backend.dto.AuthResponse;
import lombok.Data;
import com.orbit.backend.dto.LoginRequest;
import com.orbit.backend.dto.RegisterRequest;
import com.orbit.backend.entity.User;
import com.orbit.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail(),
                    request.getPhoneNumber());
            return ResponseEntity.ok(new AuthResponse("User registered successfully!", user.getId(), user.getUsername(),
                    user.getRole().name()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = userService.loginUser(request.getUsername(), request.getPassword());
            User user = userService.findByUsername(request.getUsername());

            return ResponseEntity.ok(new AuthTokenResponse("Login successful", user.getId(), user.getUsername(),
                    user.getRole().name(), token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    @lombok.EqualsAndHashCode(callSuper = true)
    static class AuthTokenResponse extends AuthResponse {
        private String token;

        public AuthTokenResponse(String message, Long userId, String username, String role, String token) {
            super(message, userId, username, role);
            this.token = token;
        }
    }
}
