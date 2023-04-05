package com.octopus.teraHire.service;


import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserNotFound;
import com.octopus.teraHire.model.EmailDetails;
import com.octopus.teraHire.model.TokenValidity;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.TokenValidityRepository;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class UserService implements UserInterface{
    @Autowired
    private UserRepository userRepository;
    private JavaMailSender javaMailSender;
    private UserDetailsServiceImpl userDetailsService;
    private EmailService emailService;

    private TokenValidityRepository tokenValidityRepository;

    public UserService(UserRepository userRepository, JavaMailSender javaMailSender, UserDetailsServiceImpl userDetailsService, EmailService emailService,TokenValidityRepository tokenValidityRepository) {
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
        this.userDetailsService = userDetailsService;
        this.emailService = emailService;

        this.tokenValidityRepository = tokenValidityRepository;
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
        String uuid = UUID.randomUUID().toString();

            if(!isUserEmailExists(user.getEmail())){
                user.setCreatedDate(getDate());
                user.setModifiedDate(getDate());
                user.setUsername(user.getUsername()+uuid.substring(1,3));
                user.setPassword(encryptPassword("Alanrs@1234"));
                user = userRepository.save(user);
                String token = UUID.randomUUID().toString();
                String resetPasswordLink = "resetpassword?id="+user.getId()+"&token=" + token;
                EmailDetails emailDetails = new EmailDetails();
                emailDetails.setRecipient(user.getEmail());
                emailDetails.setSubject("Welcome to TeraHire");
                emailDetails.setMsgBody("Hi, " +user.getFirstName()+
                        "\nWelcome Aboard, an User Profile was created with your email.\n" +
                        "Login Email: " +user.getEmail()+
                        "\nChange your Password at: " +
                        "http://localhost:4200/" + resetPasswordLink+
                        "\n" +
                        "Regards,\n\n" +
                        "Team TeraHire");

               // user.setResetPasswordToken(token);
                addToken(user,token);


                Thread th = new EmailService(emailDetails,javaMailSender);
                th.start();

                return new ResponseEntity(getJson(user,"Successfully created"), HttpStatus.OK) ;
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
    public Optional<User> getUserById(long id){
        return userRepository.findById(id);
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
     public  User getByUserEmail(String Email){return userRepository.findByEmail(Email).get();}
    @Override
    public void updatePassword(User user, String newPassword){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        user.setStatusId(101);
        userRepository.save(user);
    }

    public LocalDate getDate2(){
        LocalDate now = LocalDate.now();
        return now;
    }

    @Override
    public void addToken(User user, String token){
        TokenValidity updatedTokenBody = new TokenValidity();
        updatedTokenBody.setUser(user);
        updatedTokenBody.setToken(token);
        updatedTokenBody.setCreatedDate(getDate2());
        tokenValidityRepository.save(updatedTokenBody);
    }

}
