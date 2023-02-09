package com.octopus.teraHire.service;

import com.octopus.teraHire.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserInterface {

    ResponseEntity<User> addNewUser(User user);
    ResponseEntity<User> updateNewUser(long id, User userDetails);
    ResponseEntity deleteUserById(long id);
    List<User> getUserList();

//    UserDetails getUserByUserName(AuthUser authUser);
}
