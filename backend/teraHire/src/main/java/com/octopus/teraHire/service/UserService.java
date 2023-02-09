package com.octopus.teraHire.service;

import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.UserRepository;
import io.swagger.v3.core.util.Json;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class UserService implements UserInterface{



    private UserRepository userRepository;
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    public boolean isUserEmailExists(String emailId){
        return userRepository.existsByEmail(emailId);
    }

    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }
    private String encryptPassword(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }
    @Override
    public ResponseEntity addNewUser(User user) {

        if(!isUserEmailExists(user.getEmail())){
            user.setCreatedDate(getDate());
            user.setModifiedDate(getDate());
            user.setPassword(encryptPassword(user.getPassword()));
            return new ResponseEntity(getJson(userRepository.save(user),HttpStatus.OK), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(getJson("This email already in use.",HttpStatus.FOUND),HttpStatus.FOUND);
        }
    }


    @Override
    public ResponseEntity updateNewUser(long id, User userDetails){
        User updateNewUser = userRepository.getReferenceById(id);
        if(userRepository.existsById(id)){
            updateNewUser.setFirstName((userDetails.getFirstName()));
            updateNewUser.setLastName((userDetails.getLastName()));
            updateNewUser.setPhoneNumber((userDetails.getPhoneNumber()));
            updateNewUser.setUserTypeId((userDetails.getUserTypeId()));
            updateNewUser.setModifiedDate(getDate());

            return new ResponseEntity<>(userRepository.save(updateNewUser),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResourceNotFoundException("user not exist with id:" + id).getMessage(),HttpStatus.NOT_FOUND);
        }





    }

     Object getJson(Object message,HttpStatus status){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        return map;
    }
    @Override
    public ResponseEntity<Object> deleteUserById(long id){
        try{
            userRepository.deleteById(id);
            return new ResponseEntity<>(getJson("Successfully Deleted",HttpStatus.OK),HttpStatus.OK);
        }catch (HttpServerErrorException e){
            return new ResponseEntity(getJson("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public List<User> getUserList(){
        return userRepository.findAll();
    }





}
