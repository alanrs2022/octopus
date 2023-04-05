package com.octopus.teraHire.service;

import com.octopus.teraHire.model.TokenValidity;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.TokenValidityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@Service
public class TokenValidityService implements TokenValidityInterface{

    private TokenValidityRepository tokenValidityRepository;
    private UserService userService;

    public TokenValidityService(TokenValidityRepository tokenValidityRepository, UserService userService) {
        this.tokenValidityRepository = tokenValidityRepository;
        this.userService = userService;
    }


    @Override
    public void updateToken(User user, String token){
       TokenValidity updatedTokenBody = tokenValidityRepository.findByUser_Id(user.getId());
       updatedTokenBody.setToken(token);
       updatedTokenBody.setCreatedDate(getDate());
       tokenValidityRepository.save(updatedTokenBody);
    }
    @Override
    public  void clearToken(User user){
        TokenValidity clearToken = tokenValidityRepository.findByUser(user);
        if(clearToken!=null){
        clearToken.setToken(null);
        tokenValidityRepository.save(clearToken);}
        else {

        }

    }

    @Override
    public ResponseEntity checkTokenValidity(long userID, String token) {
        Optional<User> user = userService.getUserById(userID);
        if (user.isPresent()) {
            TokenValidity tv = tokenValidityRepository.FindTokenbyUserId(userID);
            if (tv == null) {
                return new ResponseEntity<>("No token Found", HttpStatus.NOT_FOUND);
            }
            else if (Period.between(tv.getCreatedDate(), getDate()).getDays() >= 1) {
                tv.setToken(null);
                tokenValidityRepository.save(tv);
                return new ResponseEntity("Token Expired", HttpStatus.UNAUTHORIZED);
            } else {
                if (tv.getToken()!=null && tv.getToken().equals(token)) {
                    return new ResponseEntity<>("Valid Reset Token", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Invalid Reset Token", HttpStatus.NOT_FOUND);
                }
            }
        }else{
            return new ResponseEntity<>("User not found!!", HttpStatus.NOT_FOUND);
        }
    }
    public TokenValidity findBytoken(String token){
        return tokenValidityRepository.findByToken(token);
    }
    public LocalDate getDate(){
        LocalDate now = LocalDate.now();
        return now;
    }

}
