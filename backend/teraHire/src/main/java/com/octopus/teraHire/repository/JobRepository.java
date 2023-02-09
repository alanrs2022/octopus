package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;



public interface JobRepository extends JpaRepository <Job, Long>{
    boolean existsById(Long id);

}