
package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.EmailDetails;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.EmailService;
import com.octopus.teraHire.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://172.31.217.58:4200/","http://localhost:4200/"})
@RequestMapping("/api/passwordcontroller")
public class PasswordController {

    private UserService userService;
    private EmailService emailService;

    public PasswordController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
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
            userService.updateResetPasswordToken(token, userEmail);
            String resetPasswordLink = "/resetpassword?token=" + token;
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(userEmail);
            emailDetails.setSubject("Forgot Password");
            emailDetails.setMsgBody("Hi,\n" +
                    "You have requested to reset your password.\n" +
                    "Click the link below to change your password:\n" +
                    "http://localhost:4200" + resetPasswordLink +
                    "\n" +
                    "The link is valid only for 24 hours.\n" +
                    "Regards," +
                    "\n" +
                    "Team TeraHire");
            String status = emailService.sendSimpleMail(emailDetails);
            return new ResponseEntity<>(getJson("A reset password link send to your email. Please check." + status, "Generated Token"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(getJson("Error while sending email, Not a Valid User", "Error"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reset_password/token/{token}")

    public ResponseEntity showResetPasswordForm(@PathVariable String token) {
        User user = userService.getByResetPasswordToken(token);
        if (user == null) {
            return new ResponseEntity<>(getJson("Invalid Reset Token", "Invalid"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(getJson("Valid Reset Token", "Valid"), HttpStatus.OK);
    }


    @PostMapping("/reset_password")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity processResetPassword(HttpServletRequest request,
                                               @RequestParam("token") String token,@RequestParam("password") String newPassword) {
        User user = userService.getByResetPasswordToken(token);
        if (user == null) {
            return new ResponseEntity<>(getJson("Invalid Reset Token", "Invalid"), HttpStatus.NOT_FOUND);
        } else {
            userService.updatePassword(user,newPassword);
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("Password Changed Successfully");
            emailDetails.setMsgBody("Hi,\n" +
                    "The password to your account has been updated successfully.\n" +
                    "Regards,\n" +
                    "Team TeraHire");
            String status = emailService.sendSimpleMail(emailDetails);
            return new ResponseEntity<>(getJson("Successfully Changed Password "+status, "Success"), HttpStatus.OK);
        }
    }





    }

