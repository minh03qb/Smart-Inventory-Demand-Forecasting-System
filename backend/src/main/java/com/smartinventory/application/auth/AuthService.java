package com.smartinventory.application.auth;

import com.smartinventory.application.auth.dto.AuthRequest;
import com.smartinventory.application.auth.dto.AuthResponse;

public interface AuthService {
    AuthResponse register(AuthRequest request);
    AuthResponse login(AuthRequest request);
}
