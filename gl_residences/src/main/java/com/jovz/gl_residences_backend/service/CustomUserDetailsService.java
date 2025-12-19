package com.jovz.gl_residences_backend.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.jovz.gl_residences_backend.model.User;
import com.jovz.gl_residences_backend.repository.UserRepository;

import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
                u.getUsername(),
                u.getPassword(),
                u.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
        );
    }
}
