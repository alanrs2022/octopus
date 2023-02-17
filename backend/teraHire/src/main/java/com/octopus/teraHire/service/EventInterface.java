package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Event;
import org.springframework.http.ResponseEntity;

public interface EventInterface {
    public ResponseEntity createEvent(Event event);
    public ResponseEntity deleteEvent(Event event);

}
