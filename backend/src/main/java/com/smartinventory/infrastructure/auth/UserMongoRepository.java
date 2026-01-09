package com.smartinventory.infrastructure.auth;

import com.smartinventory.domain.auth.User;
import com.smartinventory.domain.auth.UserRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoRepository extends MongoRepository<User, String>, UserRepository {
}
