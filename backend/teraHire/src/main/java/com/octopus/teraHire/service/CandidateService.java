package com.octopus.teraHire.service;

import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.repository.CandidateRepository;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService implements CandidateInterface{
    private CandidateRepository candidateRepository;
    private UserExistsException userExistsException;
    public CandidateService(CandidateRepository candidateRepository){
        this.candidateRepository = candidateRepository;
    }

    public boolean isUserEmailExists(String email){
        return candidateRepository.existsByEmail(email);
    }
    @Override
    public ResponseEntity addCandidate(Candidate candidate) {

        if (!isUserEmailExists(candidate.getEmail())) {

            return new ResponseEntity<Candidate>(candidateRepository.save(candidate), HttpStatus.OK);

        } else {

            return new ResponseEntity<>(new UserExistsException("User already exists").getLocalizedMessage(), HttpStatus.FOUND);
        }
    }
    @Override
    public ResponseEntity updateCandidate(long id, Candidate candidateDetails){
        Candidate updateCandidate = candidateRepository.getReferenceById(id);
        if(candidateRepository.existsById(id)){
            updateCandidate.setAddress((candidateDetails.getAddress()));
            updateCandidate.setCity((candidateDetails.getCity()));
            updateCandidate.setCountry((candidateDetails.getCountry()));
            updateCandidate.setCurrentCTC((candidateDetails.getCurrentCTC()));
            updateCandidate.setCurrentCompany((candidateDetails.getCurrentCompany()));
            updateCandidate.setCurrentPosition((candidateDetails.getCurrentPosition()));
            updateCandidate.setDob((candidateDetails.getDob()));
            updateCandidate.setEmail((candidateDetails.getEmail()));
            updateCandidate.setExpectedCTC((candidateDetails.getExpectedCTC()));
            updateCandidate.setFullName((candidateDetails.getFullName()));
            updateCandidate.setGender((candidateDetails.getGender()));
            updateCandidate.setNationality((candidateDetails.getNationality()));
            updateCandidate.setPhoneNumber((candidateDetails.getPhoneNumber()));
            updateCandidate.setSkills((candidateDetails.getSkills()));
            updateCandidate.setYearOfExperience((candidateDetails.getYearOfExperience()));
            updateCandidate.setZipcode((candidateDetails.getZipcode()));
            updateCandidate.setSociaLink((candidateDetails.getSociaLink()));
            updateCandidate.setStatus((candidateDetails.getStatus()));

            return new ResponseEntity<>(candidateRepository.save(updateCandidate),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResourceNotFoundException("user does not exist with this id:" + id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public List<Candidate> getCandidateList(){
        return candidateRepository.findAll();
    }



    public ResponseEntity deleteCandidateById(long id){
        if(candidateRepository.existsById(id)){
            candidateRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResourceNotFoundException("user not exist with id: " + id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public List<Job> getjoblist(long candidate_id){
        if(candidateRepository.existsById(candidate_id)){
            Candidate candidate=candidateRepository.getReferenceById(candidate_id);
            return candidate.getAppliedJobs();
        }
        else {return null;}
    }
}
