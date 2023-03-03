package com.octopus.teraHire.service;


import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.exception.UserNotFound;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class UserService implements UserInterface{
    Connection connection;
    int flag = 0;
    @Autowired
    private UserRepository userRepository;
    private UserDetailsServiceImpl userDetailsService;
    private UserExistsException userExistsException;
    public UserService(UserRepository userRepository,UserDetailsServiceImpl userDetailsService){
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
    }

//    public UserService() throws SQLException{
//
//        connection = DBUtil.getConnection();
//    }

    //checking existing email
    public boolean isUserEmailExists(String emailId){
        return userRepository.existsByEmail(emailId);
    }

    //setDate
    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }

    //Add users


    @Override
    public ResponseEntity addNewUser(User user) {

            if(!isUserEmailExists(user.getEmail())){
                user.setCreatedDate(getDate());
                user.setModifiedDate(getDate());
                user.setPassword(encryptPassword(user.getPassword()));
                return new ResponseEntity(getJson(userRepository.save(user),"Successfully created"), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(getJson("This email already in use.","Found error"),HttpStatus.FOUND);
            }

    }

    //UpdateUsers
    @Override
    public ResponseEntity updateNewUser(long id, User userDetails){
        User updateNewUser = userRepository.getReferenceById(id);
        if(userRepository.existsById(id)){
            updateNewUser.setFirstName((userDetails.getFirstName()));
            updateNewUser.setLastName((userDetails.getLastName()));
            //updateNewUser.setUsername((userDetails.getUsername()));
            updateNewUser.setPhoneNumber((userDetails.getPhoneNumber()));
            updateNewUser.setUserTypeId(userDetails.getUserTypeId());
            updateNewUser.setModifiedDate(getDate());

           return new ResponseEntity<>(userRepository.save(updateNewUser),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResourceNotFoundException("user does not exist with this id:" + id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    private String encryptPassword(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return bCryptPasswordEncoder.encode(password);
    }
    Object getJson(Object message,String status){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        return map;
    }
    //DeleteUser
    @Override
    public ResponseEntity deleteUserById(long id){
        try{
            userRepository.deleteById(id);
            return new ResponseEntity<>(getJson("Successfully Deleted","Deleted"),HttpStatus.OK);
        }catch (HttpServerErrorException e){
            return new ResponseEntity(getJson("Something went wrong.","Server Error"),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //ListUsers
    @Override
    public List<User> getUserList(){
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity getUserById(long id){
        return new ResponseEntity(userRepository.findById(id),HttpStatus.OK);
    }


    @Override
    public ResponseEntity getUserByEmail(String email){
        return new ResponseEntity(userRepository.findByEmail(email),HttpStatus.OK);
    }

    @Override
    public ResponseEntity authUser(String username, String password) {
        Optional<User> user = userRepository.findByEmail(username);

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if(user.isPresent()){
            if(bCryptPasswordEncoder.matches(password,user.get().getPassword())){

                return new ResponseEntity(getJson(userDetailsService.loadUserByUsername(user.get().getEmail()),"Login Success"),HttpStatus.OK);
            }else{
                return new ResponseEntity("The password you entered is incorrect. Try again.",HttpStatus.FORBIDDEN);
            }
        }else{
            return new ResponseEntity("Email not found!",HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void updateResetPasswordToken(String token, String email) throws UserNotFound{
        User user = userRepository.findByEmail(email).get();
        if(user!=null){
            user.setResetPasswordToken(token);
            userRepository.save(user);
        }else {
            throw new UserNotFound("Could not find User for "+email);
        }

    }

    @Override
    public User getByResetPasswordToken(String token){
        return userRepository.findByResetPasswordToken(token);
    }

    @Override
    public void updatePassword(User user, String newPassword){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }


}
