package com.octopus.teraHire.service;

import com.octopus.teraHire.dbutil.DBUtil;
import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserInterface{
    Connection connection;
    int flag = 0;
    @Autowired
    private UserRepository userRepository;
    private UserExistsException userExistsException;
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserService() throws SQLException{

        connection = DBUtil.getConnection();
    }

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

        //password hashing
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String encryptedPwd = bcrypt.encode(user.getPassword());
        user.setPassword(encryptedPwd);

        if (!isUserEmailExists(user.getEmail())) {
            user.setCreatedDate(getDate());
            user.setModifiedDate(getDate());
            return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
        } else {

            return new ResponseEntity<>(new UserExistsException("User already exists").getLocalizedMessage(), HttpStatus.FOUND);
        }
    }

    //UpdateUsers
    @Override
    public ResponseEntity updateNewUser(long id, User userDetails){
        User updateNewUser = userRepository.getReferenceById(id);
        if(userRepository.existsById(id)){
            updateNewUser.setFirstName((userDetails.getFirstName()));
            updateNewUser.setLastName((userDetails.getLastName()));
            updateNewUser.setUsername((userDetails.getUsername()));
            updateNewUser.setPhoneNumber((userDetails.getPhoneNumber()));
            updateNewUser.setModifiedDate(getDate());

           return new ResponseEntity<>(userRepository.save(updateNewUser),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResourceNotFoundException("user does not exist with this id:" + id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    //DeleteUser
    @Override
    public ResponseEntity deleteUserById(long id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResourceNotFoundException("user not exist with id: " + id).getMessage(),HttpStatus.NOT_FOUND);
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
    public int loginValidation(String email, String password) {

        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM user_table WHERE email = '"+email+"' ");
            ResultSet rs = statement.executeQuery();

            while (rs.next()){
                if(rs.getString(6).equals(email) && rs.getString(3).equals(password)){
                    flag = 1;
                }
                else {
                    System.out.println("Invalid Email/password");
                    flag = 0;
                }
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return flag;
    }

}
