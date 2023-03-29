package com.octopus.teraHire.service;

import com.octopus.teraHire.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class EmailService extends Thread  {

    private JavaMailSender javaMailSender;
    public EmailDetails emailDetails;
    @Value("${spring.mail.username}") private String sender;

    public EmailService(){

    }
    public EmailService(EmailDetails emailDetails,JavaMailSender javaMailSender){
        this.emailDetails = emailDetails;
        this.javaMailSender = javaMailSender;
    }

    public String sendSimpleMail(EmailDetails details){
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());
            javaMailSender.send(mailMessage);

            return "Success: Mail Send";
        }
        catch (Exception e){
            return "Error While Sending Mail";
        }
    }

    @Override
    public void run() {

        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetails.getRecipient());
            mailMessage.setText(emailDetails.getMsgBody());
            mailMessage.setSubject(emailDetails.getSubject());
            javaMailSender.send(mailMessage);


        }
        catch (Exception e){
            System.out.println(e);
        }
    }
}
