package com.octopus.teraHire.service;

import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NotificationService implements NotificationInterface{
    private NotificationRepository notificationRepository;
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    @Override
    public ResponseEntity createNotification(Notification notification) {
        return new ResponseEntity(notificationRepository.save(notification), HttpStatus.OK);
    }

    @Override
    public List<Notification> getNotifications() {
        return notificationRepository.findByOrderByCreatedDateDesc();
    }

    @Override
    public ResponseEntity updateNotifications(Long id) {
        notificationRepository.findByOrderByCreatedDateDesc();
        Notification updatedNotification = notificationRepository.getReferenceById(id);

        if (notificationRepository.existsById(id)) {
            updatedNotification.setNotificationType(1);
            return new ResponseEntity<>(notificationRepository.save(updatedNotification), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResourceNotFoundException("Notification Does not exist with " + id).getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}