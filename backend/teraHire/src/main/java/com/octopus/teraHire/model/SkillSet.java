
package com.octopus.teraHire.model;


import javax.persistence.*;

@Entity()
@Table(name = "skill_set")
public class SkillSet {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(name = "skill")
    private String skill;

    public SkillSet(){}
    public SkillSet(long id, String skill) {
        Id = id;
        this.skill = skill;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }
}

