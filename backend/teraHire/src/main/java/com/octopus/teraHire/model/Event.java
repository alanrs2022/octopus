package com.octopus.teraHire.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity()
@Table(name = "event_table")
@SecondaryTables({@SecondaryTable(name = "candidate_table"),@SecondaryTable(name = "user_table"),
@SecondaryTable(name = "job_table")})
/*@Setter
@Getter*/
/*@AllArgsConstructor
@NoArgsConstructor*/
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "event_id")
    private long id;

    @Column(name = "start_date")
    LocalDateTime start;
    @Column(name = "end_date")
    LocalDateTime end;
    @Column(name = "created_date")
    LocalDateTime created;
    @Column(name = "modified_date")
    LocalDateTime modified;
    @Column(name = "type")
    private String type;
    @Column(name="creator")
    private long organizer_id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_job_id",referencedColumnName = "id",table = "job_table")
    private Job job;
  /*  @Column(name = "job_id")*/
/*    private long job_id;*/

/*    @ManyToMany(mappedBy = "events",fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Candidate> candidates = new HashSet<>();*/
    @OneToOne(cascade = CascadeType.ALL,targetEntity = User.class)
    @JoinColumn(name = "fk_team_members",referencedColumnName = "id", table = "user_table")
    private Set<User> team_members = new HashSet<>();

    @OneToOne(targetEntity = Candidate.class,cascade = CascadeType.ALL)
    @JoinColumn(name="fk_candidate_id",referencedColumnName = "id",table = "candidate_table")
    private Set<Candidate> candidates = new HashSet<>();

    public Event(){}

    public Event(long id, LocalDateTime start, LocalDateTime end, LocalDateTime created, LocalDateTime modified, String type, long organizer_id, Job job, Set<Candidate> candidates, Set<User> users) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.created = created;
        this.modified = modified;
        this.type = type;
        this.organizer_id = organizer_id;
        this.job = job;
        this.candidates=candidates;
        this.team_members=users;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getModified() {
        return modified;
    }

    public void setModified(LocalDateTime modified) {
        this.modified = modified;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getOrganizer_id() {
        return organizer_id;
    }

    public void setOrganizer_id(long organizer_id) {
        this.organizer_id = organizer_id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job= job;
    }

    public Set<Candidate> getCandidate() {
        return candidates;
    }

    public void setCandidate(Set<Candidate> candidate) {
        this.candidates = candidate;
    }

    public Set<User> getTeam_members() {
        return team_members;
    }

    public void setTeam_members(Set<User> team_members) {
        this.team_members = team_members;
    }
}
