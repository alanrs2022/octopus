package com.octopus.teraHire.service;

import com.octopus.teraHire.model.User;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public interface TokenValidityInterface {
    void updateToken(User user, String token);
    void clearToken(User user);
    ResponseEntity checkTokenValidity(long userID, String token);
}
