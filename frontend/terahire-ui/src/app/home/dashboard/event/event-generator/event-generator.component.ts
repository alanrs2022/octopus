import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../../models/candidate';
import { Job } from '../../../../models/job';
import { user } from '../../../../models/user.model';
import { Event } from '../../../../models/event.model';
import { CandidateService } from 'src/app/service/candidate.service';
import {UserService } from 'src/app/service/user.service';
import { JobService } from '../../../../service/job.service';
import { EventService } from '../../../../service/event.service';

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.scss']
})
export class EventGeneratorComponent implements OnInit {
  startDate!:Date;
  endDate!:Date;
  createdDate!:Date;
  modifiedDate!:Date;
  type!:string;
  organizerID!:number;
  teamMembers!:user[];
  candidates!: Candidate[];
  job!:Job;
  candidatesList!:Candidate[];
  teamList!:user[];
  jobList!:Job[];

 
  constructor(private _candidateService: CandidateService,private _userService: UserService,private _jobService: JobService,private _eventService:EventService ) { 
    // this.teamList=[];
    // this.teamMembers=[];
  }
  ngOnInit(): void {
    this.getAllMembers();
    this.getAllCandidates();
    this.getAllJobs();
    this.organizerID=107;
    // Login-User's ID passed here
  }
  private getAllMembers(){
    this._userService.getAllUsers().subscribe(data=>{
      this.teamList=data;
    })
  }
  private getAllCandidates(){
    this._candidateService.getCandidateList().subscribe(data=>{
      this.candidatesList=data;
    })
  }
  private getAllJobs(){
    this._jobService.getJobList().subscribe(data=>{
      this.jobList=data;
    })
  }

 
  saveEventClick(){
    if(this.endDate>=this.startDate){
    let newEvent:Event= {
      id:0,
      start:this.startDate,
      end:this.endDate,
      created:null,
      modified: null,
      type:this.type,
      organizer_id:this.organizerID,
      job:this.job,
      team_members:this.teamMembers,
      candidate:this.candidates
    }
    console.log(newEvent);
    this._eventService.createEvent(newEvent).subscribe(response=>{
      console.log(response)
    })
    

  }
  else{
    alert('Invalid Entry: Start date must come before End date');
  }
}


}
