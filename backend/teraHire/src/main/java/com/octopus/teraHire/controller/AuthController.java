package com.octopus.teraHire.controller;


import com.octopus.teraHire.model.AuthUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserDetailsService userDetailsService;

    public AuthController(UserDetailsService userDetailsService){
        this.userDetailsService = userDetailsService;
    }
    @PostMapping("/login")
    public UserDetails login(@RequestBody AuthUser authUser){
        return userDetailsService.loadUserByUsername(authUser.getUsername());
    }
}
