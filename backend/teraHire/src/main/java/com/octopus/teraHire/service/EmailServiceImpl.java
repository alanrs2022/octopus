package com.octopus.teraHire.service;

import com.octopus.teraHire.model.EmailDetails;

public interface EmailServiceImpl {
    String sendSimpleMail(EmailDetails details);
}
