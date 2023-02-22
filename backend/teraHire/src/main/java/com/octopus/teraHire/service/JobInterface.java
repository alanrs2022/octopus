package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Job;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface JobInterface {
    List<Job> getJobList();
    ResponseEntity<Job> addNewJob(Job job);
    ResponseEntity deleteJobById(Long id);
    ResponseEntity<Job> updateJob(Long id, Job job);

}