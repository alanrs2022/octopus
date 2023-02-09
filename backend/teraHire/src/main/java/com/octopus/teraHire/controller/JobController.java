package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/job")
public class JobController {
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }
    @GetMapping("auth/list")
    public List<Job> getallJobs(){
        return jobService.getJobList();
    }
    @PostMapping("/new")
    public ResponseEntity<Job> addNewJob(@RequestBody @Valid Job job){
        return jobService.addNewJob(job);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job){
        return jobService.updateJob(id,job);
    }
    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity deleteJob(@PathVariable Long id){
        return jobService.deleteJobById(id);
    }
}