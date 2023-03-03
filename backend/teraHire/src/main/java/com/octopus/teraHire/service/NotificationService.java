package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NotificationService implements NotificationInterface {

    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;

    }
    public NotificationService(){

    }

    @Override
    public ResponseEntity createNotification(Notification notification){
        return new ResponseEntity(notificationRepository.save(notification), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Notification>> getNotifications() {
        return new ResponseEntity<>(notificationRepository.findAll(),HttpStatus.OK);
    }
}
