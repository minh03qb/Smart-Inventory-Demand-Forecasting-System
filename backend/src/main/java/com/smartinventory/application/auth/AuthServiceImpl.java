package com.smartinventory.application.auth;

import com.smartinventory.application.auth.dto.AuthRequest;
import com.smartinventory.application.auth.dto.AuthResponse;
import com.smartinventory.domain.auth.User;
import com.smartinventory.domain.auth.UserRepository;
import com.smartinventory.exception.BadRequestException;
import com.smartinventory.exception.UnauthorizedException;
import com.smartinventory.infrastructure.auth.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse register(AuthRequest request) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            throw new BadRequestException("Username already exists");
        }

        // Convert string roles to enum roles
        Set<User.Role> roles = new HashSet<>();
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            roles = request.getRoles().stream()
                    .map(User.Role::valueOf)
                    .collect(Collectors.toSet());
        } else {
            roles.add(User.Role.STAFF); // Default role
        }

        // Create new user with hashed password
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        // Generate JWT token
        Set<String> roleStrings = savedUser.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());
        String token = jwtUtil.generateToken(savedUser.getUsername(), roleStrings);

        return new AuthResponse(token, savedUser.getUsername(), roleStrings);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        // Find user by username
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (!userOpt.isPresent()) {
            throw new UnauthorizedException("Invalid username or password");
        }

        User user = userOpt.get();

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        // Generate JWT token
        Set<String> roleStrings = user.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());
        String token = jwtUtil.generateToken(user.getUsername(), roleStrings);

        return new AuthResponse(token, user.getUsername(), roleStrings);
    }
}
