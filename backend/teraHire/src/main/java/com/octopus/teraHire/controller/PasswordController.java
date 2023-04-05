
package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.EmailDetails;
import com.octopus.teraHire.model.TokenValidity;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.EmailService;
import com.octopus.teraHire.service.TokenValidityService;
import com.octopus.teraHire.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/passwordcontroller")
public class PasswordController {

    private UserService userService;
    private EmailService emailService;
    private TokenValidityService tokenValidityService;
    private JavaMailSender javaMailSender;

    public PasswordController(UserService userService, EmailService emailService, JavaMailSender javaMailSender, TokenValidityService tokenValidityService) {
        this.userService = userService;
        this.emailService = emailService;
        this.javaMailSender = javaMailSender;
        this.tokenValidityService=tokenValidityService;
    }



    Object getJson(Object message, String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        return map;
    }

    @PostMapping("/forgot_password")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity processForgotPassword(HttpServletRequest request,
                                                @RequestBody String userEmail) {
        String token = UUID.randomUUID().toString();
        if(userService.isUserEmailExists(userEmail)){
            //userService.updateResetPasswordToken(token, userEmail);
            User PasswordForgotUser = userService.getByUserEmail(userEmail);
            String resetPasswordLink = "/resetpassword?"+"id="+PasswordForgotUser.getId()+"&token=" + token;
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(userEmail);
            emailDetails.setSubject("Forgot Password");
            emailDetails.setMsgBody("Hi,\n" +
                    "You have requested to reset your password.\n" +
                    "Click the link below to change your password:\n" +
                    "http://localhost:4200" + resetPasswordLink +
                    "\n" +
                    "The link is valid only for 24 hours.\n" +
                    "\n" +
                    "Regards," +
                    "\n" +
                    "Team TeraHire");
            Thread th = new EmailService(emailDetails,javaMailSender);
            tokenValidityService.updateToken(PasswordForgotUser,token);
            th.start();
            return new ResponseEntity<>(getJson("A reset password link send to your email. Please check." + "Success", "Generated Token"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(getJson("Error while sending email, Not a Valid User", "Error"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reset_password/{id}/{token}")

    public ResponseEntity showResetPasswordForm(@PathVariable("token") String token,@PathVariable("id") long ID) {
        return tokenValidityService.checkTokenValidity(ID,token);
    }


    @PostMapping("/reset_password")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity processResetPassword(HttpServletRequest request,@RequestParam("id")long id,
                                               @RequestParam("token") String token,@RequestParam("password") String newPassword) {
        Optional<User> user = userService.getUserById(id);
        //TokenValidity tokenValidity = tokenValidityService.findBytoken(token);
        if (user==null) {
            return new ResponseEntity<>(getJson("Invalid Reset Token", "Invalid"), HttpStatus.NOT_FOUND);
        } else {
            userService.updatePassword(user.get(),newPassword);
            tokenValidityService.clearToken(user.get());
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.get().getEmail());
            emailDetails.setSubject("Password Changed Successfully");
            emailDetails.setMsgBody("Hi,\n" +
                    "The password to your account has been updated successfully.\n" +
                    "Regards,\n" +
                    "Team TeraHire");
            Thread th = new EmailService(emailDetails,javaMailSender);
            th.start();
            return new ResponseEntity<>(getJson("Successfully Changed Password "+"Success", "Success"), HttpStatus.OK);
        }
    }





    }

