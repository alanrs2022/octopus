package com.octopus.teraHire.model;

import javax.persistence.*;


@Entity
@Table(name = "job_table")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @Column(name="title")
    private String title;
    @Column(name="owner")
    private String owner;
    @Column(name="stage")
    private String stage;
    @Column(name="status")
    private String status;
    @Column(name="active_candidates")
    private int activeCandidates;
    @Column(name="dropped_candidates")
    private int droppedCandidates;
    @Column(name="vacancy")
    private int vacancy;
    @Column(name="summary")
    private String summary;
    @Column(name="team_id")
    private String teamID;
    @Column(name="score_card")
    private int scoreCard;
    private long uq=1000;
    /*@ManyToOne*/
    /*private Candidate candidate;*/

    public Job() {
    }

    public Job(long id, String title, String owner, String stage, String status, int activeCandidates, int droppedCandidates, int totalNoOfCandidates, String summary, String teamID, int scoreCard) {
        this.Id = id;
        this.title = title;
        this.owner = owner;
        this.stage = stage;
        this.status = status;
        this.activeCandidates = activeCandidates;
        this.droppedCandidates = droppedCandidates;
        this.vacancy = totalNoOfCandidates;
        this.summary = summary;
        this.teamID = teamID;
        this.scoreCard = scoreCard;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        this.Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getActiveCandidates() {
        return activeCandidates;
    }

    public void setActiveCandidates(int activeCandidates) {
        this.activeCandidates = activeCandidates;
    }

    public int getDroppedCandidates() {
        return droppedCandidates;
    }

    public void setDroppedCandidates(int droppedCandidates) {
        this.droppedCandidates = droppedCandidates;
    }

    public int getVacancy() {
        return vacancy;
    }

    public void setVacancy(int totalNoOfCandidates) {
        vacancy = totalNoOfCandidates;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getTeamID() {
        return teamID;
    }

    public void setTeamID(String teamID) {
        this.teamID = teamID;
    }

    public int getScoreCard() {
        return scoreCard;
    }

    public void setScoreCard(int scoreCard) {
        this.scoreCard = scoreCard;
    }
}