package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.CandidateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/candidate")

public class CandidateController {

    public CandidateService candidateService;
    public CandidateController(CandidateService candidateService){
        this.candidateService=candidateService;
    }
    //AddCandidate
    @PostMapping("/newCandidate")
    public ResponseEntity<Candidate> addCandidate(@RequestBody @Valid Candidate candidate){
        return candidateService.addCandidate(candidate);
    }
    //UpdateCandidate
    @PutMapping("/updateCandidate/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable long id,@RequestBody Candidate candidateDetails){
        return candidateService.updateCandidate(id,candidateDetails);
    }

    @GetMapping(value = "/viewCandidates")
    public List<Candidate> getCandidateList(){
        return candidateService.getCandidateList();
    }

    @DeleteMapping (value="deleteCandidate/{id}")
    public ResponseEntity<User> deleteCandidate(@PathVariable long id){
        return candidateService.deleteCandidateById(id);

    }
}

