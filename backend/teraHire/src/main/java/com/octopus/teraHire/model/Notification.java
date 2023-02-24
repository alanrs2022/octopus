package com.octopus.teraHire.model;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification_table")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;


    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "notification_type")
    private int notificationType;

    @Column(name = "notification_status")
    private int notificationStatus;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    public Notification(){

    }

    public Notification(long id, String title, String body, int notificationType, int notificationStatus, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        Id = id;
        this.title = title;
        this.body = body;
        this.notificationType = notificationType;
        this.notificationStatus = notificationStatus;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(int notificationType) {
        this.notificationType = notificationType;
    }

    public int getNotificationStatus() {
        return notificationStatus;
    }

    public void setNotificationStatus(int notificationStatus) {
        this.notificationStatus = notificationStatus;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
