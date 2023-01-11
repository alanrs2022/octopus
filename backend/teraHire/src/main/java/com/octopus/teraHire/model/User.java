package com.octopus.teraHire.model;


import javax.persistence.Entity;
import javax.persistence.*;
import javax.persistence.Table;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    long Id;
    String username;
    String email;
    String password;
    String FirstName;
    String LastName;

    public User(){

    }
    public User(long id, String username, String email, String password, String firstName, String lastName) {
        Id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        FirstName = firstName;
        LastName = lastName;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }
}
