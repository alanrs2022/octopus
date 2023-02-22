package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    boolean existsByEmail(String email);
    /*List<Candidate> findCandidatesByEventId(long eventId);*/

}
