package com.octopus.teraHire.controller;
import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.service.NotificationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "http://localhost:4200")
@SecurityRequirement(name = "user-authenticate")
public class NotificationController {

    public NotificationService notificationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/notification")
@SecurityRequirement(name = "user-authenticate")
public class NotificationController {

    private NotificationService notificationService;


    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_IN','ROLE_HM')")
    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    private ResponseEntity getNotifications(){
       return notificationService.getNotifications();
    }



    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_IN','ROLE_HM')")
    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Notification> getNotifications(){
       return notificationService.getNotifications();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_IN','ROLE_HM')")
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity updateNotification(@PathVariable Long id){
        return notificationService.updateNotifications(id);
    }


}

