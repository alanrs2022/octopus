
package com.octopus.teraHire.service;

import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.SkillSet;
import com.octopus.teraHire.repository.SkillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService implements SkillInterface{

    private SkillRepository skillRepository;
    public SkillService(SkillRepository skillRepository){
        this.skillRepository = skillRepository;
    }
    @Override
    public ResponseEntity addSkill(SkillSet skillSet) {

            return new ResponseEntity<SkillSet>(skillRepository.save(skillSet), HttpStatus.OK);
    }
    @Override
    public List<SkillSet> getSkillList(){
        return skillRepository.findAll();
    }
}
