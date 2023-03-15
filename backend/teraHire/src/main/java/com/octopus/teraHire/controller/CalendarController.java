package com.octopus.teraHire.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.Event;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.EventRepository;
import com.octopus.teraHire.service.EventService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/calendar")
@SecurityRequirement(name = "user-authenticate")
public class CalendarController {

 private EventService eventService;

    public CalendarController(EventService eventService) {
        this.eventService = eventService;
    }



    /*@RequestMapping("/testevent")
    @ResponseBody
    String home() {
        return "Welcome!";
    }
    @GetMapping("/events")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    Iterable<Event> events(@RequestParam("start")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime start, @RequestParam("end")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end){
        return eventRepository.findBetween(start, end);
    }*/
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/new")
    public ResponseEntity<Event> addAnEvent(@RequestBody @Valid Event event){
        return eventService.createEvent(event);
    }



    @PutMapping(value = "/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    public ResponseEntity<Event> updateEvent(@PathVariable long id, @RequestBody Event event){
        return eventService.updateEvent(id,event);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_HM','ROLE_IN')")
    @GetMapping(value = "/list")
    public ResponseEntity<List<Event>> getEventList(){
        return eventService.getAllEvent();
    }
    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    public ResponseEntity<Event> deleteAnEvent(@RequestBody @Valid long id){
        return eventService.deleteEvent(id);
    }


}
