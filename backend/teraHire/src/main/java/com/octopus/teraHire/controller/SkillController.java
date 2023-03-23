package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.SkillSet;
import com.octopus.teraHire.service.SkillService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://172.31.217.58:4200/","http://localhost:4200/"})
@RestController
@RequestMapping("/api/skills")
@SecurityRequirement(name = "user-authenticate")
public class SkillController {
    public SkillService skillService;
    public SkillController(SkillService skillService){
        this.skillService = skillService;
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    @PostMapping("/new")
    public ResponseEntity<SkillSet> addSkill(@RequestBody @Valid SkillSet skillSet){
        return skillService.addSkill(skillSet);
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HM','ROLE_IN','ROLE_HR')")
    @GetMapping(value = "/list")
    public List<SkillSet> getSkillList(){
        return skillService.getSkillList();
    }
}
