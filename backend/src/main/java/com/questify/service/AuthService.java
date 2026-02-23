package com.questify.service;

import com.questify.dto.request.LoginRequest;
import com.questify.dto.request.RegisterRequest;
import com.questify.dto.request.UpdateProfileRequest;
import com.questify.dto.response.AuthResponse;
import com.questify.exception.EmailAlreadyExistsException;
import com.questify.exception.InvalidCredentialsException;
import com.questify.exception.ResourceNotFoundException;
import com.questify.model.User;
import com.questify.repository.UserRepository;
import com.questify.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email ja cadastrado: " + request.getEmail());
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(Instant.now());
        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getId());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Email ou senha invalidos"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Email ou senha invalidos");
        }

        String token = jwtTokenProvider.generateToken(user.getId());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    public AuthResponse getCurrentUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario nao encontrado"));
        return new AuthResponse(null, user.getId(), user.getName(), user.getEmail());
    }

    public AuthResponse updateProfile(String userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario nao encontrado"));

        if (request.getName() != null) {
            user.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new EmailAlreadyExistsException("Email ja cadastrado: " + request.getEmail());
            }
            user.setEmail(request.getEmail());
        }

        user = userRepository.save(user);
        return new AuthResponse(null, user.getId(), user.getName(), user.getEmail());
    }
}
