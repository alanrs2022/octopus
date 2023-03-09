
package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.SkillSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<SkillSet, Long> {
}
