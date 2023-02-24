package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class NotificationService {

    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;

    }

    public ResponseEntity createNotification(Notification notification){
        return new ResponseEntity(notificationRepository.save(notification), HttpStatus.OK);
    }



}
