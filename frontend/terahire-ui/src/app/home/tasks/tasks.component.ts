import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/models/job';
import { AuthService } from 'src/app/service/auth.service';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private authService:AuthService,private jobService:JobService) { }

  userType!:string;
  
  @Output() jobEvent:EventEmitter<boolean> = new EventEmitter();
  jobList = new MatTableDataSource<Job>()
  
  ngOnInit(): void {
    this.authService.getServerStatus();
    this.userType = this.authService.getRoles();
  }
  
  updateChange(){
    this.jobEvent.emit(true);
  }
  private getAllJobs(){ 
    this.jobService.getJobList().subscribe((data: Job[])=>{
     this.jobList.data = data
    
   },error=>{
    
   });
 }


}
