package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Event;
import org.springframework.http.ResponseEntity;

public interface EventInterface {
    public ResponseEntity createEvent(Event event);

    abstract ResponseEntity updateEvent(long id, Event eventdetails);

    public ResponseEntity deleteEvent(long id);

    public Event getEventById(long id);
}
