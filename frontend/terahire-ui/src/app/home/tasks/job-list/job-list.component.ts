import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/service/job.service';
import{MatDialog} from '@angular/material/dialog'
import { JobEditComponent } from '../job-edit/job-edit.component';

import { MatPaginator } from '@angular/material/paginator';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


import { MatTableDataSource } from 'node_modulessegd/@angular/material/table';
import { Router } from 'node_modulessegd/@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  
 
  @Input()JobData!:Job
  showJobEditComponent:boolean[]=[false];
  constructor(private authService:AuthService, private jobService:JobService, private router:Router,private dialog: MatDialog) { }
  displayedColumns: string[] = ['title','owner','stage','status','vacancy','activeCandidates','droppedCandidates','summary','teamID','scoreCard','actions']
  dataSource = new MatTableDataSource<Job>();

  userType!:string;

  ngOnInit(): void {
    this.userType = this.authService.getRoles();
    this.getAllJobs();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private getAllJobs(){ 
     this.jobService.getJobList().subscribe((data: Job[])=>{
      this.dataSource.data=data;
    });
  }

  openDialog(id:number,name:string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {id: id, message: "Are you sure want to delete ",username:name,funId:3},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed'+result);

     this.getAllJobs();
    });
  }

  onDeleteClicked(id:number){
    if(confirm("Are you sure you want to delete ?")){
   
  }
   // location.reload();
  }
  onUpdateClicked(job:Job){
    this.dialog.open(JobEditComponent,{ 
      data:  job ,
      width: '40%',
      height: '70%',
    }).afterClosed().subscribe((result: any)=>{
      this.getAllJobs();
    })
  }

  //Search box
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}
