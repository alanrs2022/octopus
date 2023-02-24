package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
