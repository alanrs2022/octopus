package com.octopus.teraHire.service;


import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.Event;
import com.octopus.teraHire.repository.CandidateRepository;
import com.octopus.teraHire.repository.EventRepository;
import com.octopus.teraHire.repository.JobRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EventService implements EventInterface{
     private EventRepository eventRepository;
    private JobRepository jobRepository;
    private CandidateRepository candidateRepository;


    public EventService(EventRepository eventRepository, JobRepository jobRepository, CandidateRepository candidateRepository) {
        this.eventRepository = eventRepository;
        this.jobRepository = jobRepository;
        this.candidateRepository = candidateRepository;
    }
    /*public boolean isEventExists(long id){
        return eventRepository.isEventExists(id);
    }*/
  @Override
    public ResponseEntity createEvent(Event event){
        return new ResponseEntity<Event>(eventRepository.save(event),HttpStatus.OK);
  }
  @Override
  public ResponseEntity deleteEvent(Event event){
        if(true){
            eventRepository.delete(event);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {return new ResponseEntity<>(new ResourceNotFoundException("Event Does not exist"+event.getId()).getMessage(),HttpStatus.NOT_FOUND);}
        }



}
