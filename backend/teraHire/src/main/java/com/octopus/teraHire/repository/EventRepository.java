package com.octopus.teraHire.repository;


import com.octopus.teraHire.model.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

@Component
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select (count(e) > 0) from Event e inner join e.candidates candidates where candidates.id = ?1")
    boolean isCandidateExists(long Id);
    boolean existsByCandidates_Id(long Id);
    /*List<Event> findByCreator(User creator);*/
    /* boolean isEventExists(long id);*/



   /* @Query("from Event e where not(e.end < :from or e.start > :to)")
    public List<Event> findBetween(@Param("from") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime end);


*/
}