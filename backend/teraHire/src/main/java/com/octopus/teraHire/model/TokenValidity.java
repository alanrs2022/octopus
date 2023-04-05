package com.octopus.teraHire.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "token_validity")

public class TokenValidity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @OneToOne(cascade = CascadeType.MERGE,targetEntity = User.class)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @Column(name = "token")
    private String token;
    @Column(name = "tk_created_date")
    private LocalDate createdDate;

    public TokenValidity(){}

    public TokenValidity(long id, User userID, String token, LocalDate createdDate) {
        Id = id;
        user = userID;
        this.token = token;
        this.createdDate = createdDate;
    }

    public User getUserID() {
        return user;
    }

    public void setUserID(User userID) {
        user = userID;
    }

    public long getId() {
        return Id;
    }
    public void setId(long id) {
        Id = id;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}
