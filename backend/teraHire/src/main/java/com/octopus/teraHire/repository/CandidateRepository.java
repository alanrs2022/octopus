package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    @Query("select c from Candidate c where c.status like ?1")
    List<Candidate> findByStatusLike(String status);
    boolean existsByEmail(String email);
    /*List<Candidate> findCandidatesByEventId(long eventId);*/

}
