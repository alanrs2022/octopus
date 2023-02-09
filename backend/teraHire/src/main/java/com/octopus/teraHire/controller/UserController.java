package com.octopus.teraHire.controller;


import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.UserRepository;
import com.octopus.teraHire.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")

public class UserController {

    @Autowired
    private UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("user/{email}/{password}")

    public int UserLogin(@PathVariable("email") String email1, @PathVariable("password") String password1){

        int flag = userService.loginValidation(email1,password1);
        if(flag == 0){
            return 0;
        }
        else {
            return flag;
        }
    }

    @PostMapping("/new")
    public ResponseEntity<User> addNewUser(@RequestBody @Valid User user){
        return userService.addNewUser(user);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/updateNewUser/{id}")
    public ResponseEntity<User> updateNewUser(@PathVariable long id,@RequestBody User userDetails){
        return userService.updateNewUser(id,userDetails);
    }

    @GetMapping(value = "/users")
    public List<User> getUserList(){
        return userService.getUserList();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/getUsers/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id)
    {return userService.getUserById(id);}

    @DeleteMapping (value="deleteUser/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id){
        return userService.deleteUserById(id);

    }
//    @PostMapping("/authenticateUser")
//    public String authenticateUser(@RequestBody User user){
//        return userService.authenticateUser(user);
//    }

}


