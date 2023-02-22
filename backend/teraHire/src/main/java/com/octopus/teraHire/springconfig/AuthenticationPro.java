//package com.octopus.teraHire.springconfig;
//
//import com.octopus.teraHire.service.UserDetailsServiceImpl;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//
//
//public class AuthenticationPro extends DaoAuthenticationProvider {
//
//    private final DaoAuthenticationProvider authenticationProvider;
//    private final UserDetailsServiceImpl userDetailsService;
//    public AuthenticationPro(DaoAuthenticationProvider authenticationProvider, UserDetailsServiceImpl userDetailsService){
//
//        this.authenticationProvider = authenticationProvider;
//        this.userDetailsService = userDetailsService;
//    }
//    public DaoAuthenticationProvider authenticationProvider(){
//        authenticationProvider.setUserDetailsService(userDetailsService);
//        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
//        return authenticationProvider;
//    }
//}
