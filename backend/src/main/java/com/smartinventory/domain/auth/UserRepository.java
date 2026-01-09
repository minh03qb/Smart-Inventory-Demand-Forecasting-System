package com.smartinventory.domain.auth;

import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findByUsername(String username);
    Optional<User> findById(String id);
}
