import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/service/job.service';
import { Notification } from 'src/app/models/notification.model';


@Component({
  selector: 'app-job',
  templateUrl: './job-registration.component.html',
  styleUrls: ['./job-registration.component.scss']
})
export class JobComponent implements OnInit {

  
  
  jobRegisterForm!: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder,private jobService: JobService,private _snackBar:MatSnackBar) { }

  notification:Notification={
    title:"Job Registration",
    body: "Job registered successfully..",
    notificationType: 0,
    notificationStatus:102,
    createdDate:"",
    modifiedDate:"any",
    id:0,

  }

  ngOnInit(): void {
    this.jobRegisterForm = this.formBuilder.group({   
      title: ['',[Validators.required]],
      owner:['',[Validators.required]],   
      stage:['',[Validators.required]],    
      status: ['',[Validators.required]],
      vacancy:['',Validators.required],
      activeCandidates:['',Validators.required],
      droppedCandidates:['',Validators.required],
      summary:['',Validators.required],
      teamID:['',Validators.required],
      scoreCard:['',Validators.required],
      notification:['{'+this.notification+'}',Validators.required]
  });
  console.log(this.jobRegisterForm)
  }

  openSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000
    })
   
  }

  get f() { return this.jobRegisterForm.controls; }


  
    onSubmit() {
        this.submitted = true;
        this.jobRegisterForm.get('notification')?.setValue(this.notification)
        console.log(this.jobRegisterForm.value)
        // stop here if form is invalid
        if (!this.jobRegisterForm.valid) {
            return;
        }else{
          
          this.jobService.createJob(this.jobRegisterForm.value).subscribe(data=>{
           // console.log(data);
            this.openSnackBar("Successfully created.")
            
            this.jobRegisterForm.clearValidators();
            this.jobRegisterForm.reset();
            this.submitted = false;
          },error=>{
            this.openSnackBar("Failed! Try again.")
            console.log(error)
          });
        }

     //  window.location.reload()
       
    }

    




}
