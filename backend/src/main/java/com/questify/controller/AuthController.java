package com.questify.controller;

import com.questify.dto.request.LoginRequest;
import com.questify.dto.request.RegisterRequest;
import com.questify.dto.request.UpdateProfileRequest;
import com.questify.dto.response.AuthResponse;
import com.questify.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(Authentication authentication) {
        AuthResponse response = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<AuthResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        AuthResponse response = authService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(response);
    }
}
