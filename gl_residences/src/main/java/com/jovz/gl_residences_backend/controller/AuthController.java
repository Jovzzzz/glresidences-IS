package com.jovz.gl_residences_backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.jovz.gl_residences_backend.model.User;
import com.jovz.gl_residences_backend.repository.UserRepository;
import com.jovz.gl_residences_backend.security.JwtUtils;

import java.util.Set;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authManager, UserRepository userRepo, PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username and password are required"));
        }

        if (userRepo.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username already exists"));
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of("ROLE_USER"));

        userRepo.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Registration successful",
                        "username", username));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(body.get("username"), body.get("password")));
            String token = jwtUtils.generateToken(auth.getName());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid Credentials"));
        }
    }
}
