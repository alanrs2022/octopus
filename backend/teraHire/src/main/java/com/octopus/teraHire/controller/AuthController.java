package com.octopus.teraHire.controller;


import com.octopus.teraHire.model.AuthUser;
import com.octopus.teraHire.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://172.31.217.58:4200/","http://localhost:4200/"})

@RequestMapping("/api/auth")

public class AuthController {

    private UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/login")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity login(@RequestBody AuthUser authUser){
        return userService.authUser(authUser.getUsername(),authUser.getPassword());
    }

    @GetMapping("/status")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity get(){
        return new ResponseEntity(HttpStatus.OK);
    }

}
