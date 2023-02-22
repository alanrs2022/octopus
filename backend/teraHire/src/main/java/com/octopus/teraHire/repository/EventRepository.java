package com.octopus.teraHire.repository;


import com.octopus.teraHire.model.Event;

import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {
    /*List<Event> findByCreator(User creator);*/
   /* boolean isEventExists(long id);*/



   /* @Query("from Event e where not(e.end < :from or e.start > :to)")
    public List<Event> findBetween(@Param("from") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime start, @Param("to") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime end);


*/
}