package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.SkillSet;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SkillInterface {
    ResponseEntity<SkillSet> addSkill(SkillSet skillSet);
    List<SkillSet> getSkillList();
}
