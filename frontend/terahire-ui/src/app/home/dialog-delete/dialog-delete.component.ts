import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/models/dialog.model';
import { CandidateService } from 'src/app/service/candidate.service';
import { EventService } from 'src/app/service/event.service';
import { JobService } from 'src/app/service/job.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService, private eventService: EventService, private snackBar: MatSnackBar, private candidateService: CandidateService, private jobService: JobService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(qn: number) {
    if (qn == 1) {
      this.userService.deleteUser(this.data.id).subscribe((response: { body: any; }) => {
        console.log(JSON.parse(JSON.stringify(response.body)).message)
        this.dialogRef.close()
        this.snackBar.open("Deleted!!", '', {
          duration: 3000
        })
      })
    } else if (qn == 2) {
      this.candidateService.deleteCandidate(this.data.id).subscribe((data: any) => {
        console.log(data)
        this.dialogRef.close()
        this.snackBar.open("Deleted!!", '', {
          duration: 3000
        })

      },err=>{        
          this.snackBar.open(" ", '', {
            duration: 5000,
            panelClass: ['warning-snackbar','warning-snackbars'],           
            
          })         
        
      })
    } else if (qn == 3) {
      this.jobService.deleteJob(this.data.id).subscribe({
        next: (data: any) => {
          //console.log(data)
          this.dialogRef.close()
          this.snackBar.open("Deleted!!", '', {
            duration: 3000
          })
        }, error: (e: any) => {
          console.log(e)

        }
      });
    } else if (qn == 4) {
      this.eventService.deleteEvent(this.data.id).subscribe(data => {
        this.snackBar.open("Deleted!!", '', { duration: 3000 })
        this.dialogRef.close();
      }, error => {
        this.snackBar.open("Delete failed!!", '', { duration: 3000 })
        this.dialogRef.close();
      })
    } else {
      this.snackBar.open("Something went wrong!", '', { duration: 3000 })
    }
  }

  //   userDelete(userService:UserService,data:DialogData):boolean{

  //   //console.log("Function Called")
  //        //user delete method


  //       return true;

  // }





}
