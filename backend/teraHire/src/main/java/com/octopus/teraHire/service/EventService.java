package com.octopus.teraHire.service;


import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.model.Event;
import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.repository.CandidateRepository;
import com.octopus.teraHire.repository.EventRepository;
import com.octopus.teraHire.repository.JobRepository;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService implements EventInterface{
     private EventRepository eventRepository;



    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;

    }
    /*public boolean isEventExists(long id){
        return eventRepository.isEventExists(id);
    }*/
  @Override
  @Transactional
    public ResponseEntity createEvent(Event event){

      event.setCreated(getDate());

      event.setModified(getDate());
      return new ResponseEntity<Event>(eventRepository.save(event),HttpStatus.OK);
  }
  @Override
  public ResponseEntity updateEvent(long id, Event eventDetails){
      Event updateEvent = eventRepository.getReferenceById(id);
      if(eventRepository.existsById(eventDetails.getId())){
          updateEvent.setStart(eventDetails.getStart());
          updateEvent.setEnd(eventDetails.getEnd());
          updateEvent.setType(eventDetails.getType());
          updateEvent.setJob(eventDetails.getJob());
          updateEvent.setTeam_members(eventDetails.getTeam_members());
          updateEvent.setCandidate(eventDetails.getCandidate());
          updateEvent.setModified(getDate());
          return new ResponseEntity<>(eventRepository.save(updateEvent),HttpStatus.OK);
      }
      else{return new ResponseEntity<>(new ResourceNotFoundException("Event Does not exist"+updateEvent.getId()).getMessage(),HttpStatus.NOT_FOUND);}
  }
  @Override
  public ResponseEntity deleteEvent(long id) {
      if (eventRepository.existsById(id)) {
          Event event = eventRepository.getReferenceById(id);
          eventRepository.delete(event);
          return new ResponseEntity<>(HttpStatus.OK);
      } else {
          return new ResponseEntity<>(new ResourceNotFoundException("Event Does not exist" + id).getMessage(), HttpStatus.NOT_FOUND);
      }
  }

    @Override
    public Event getEventById(long id) {
        return eventRepository.getReferenceById(id);
    }

    @Override
    public ResponseEntity<List<Event>> getAllEvent() {
        return new ResponseEntity<List<Event>>(eventRepository.findAll(),HttpStatus.OK);
    }

    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }



}
