package com.octopus.teraHire.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "logData")

public class LogModel {
    @Id
    private long Id;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    public LogModel() {
    }

    public LogModel(long id, String email, String password) {
        Id = id;
        this.email = email;
        this.password = password;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
