import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from 'src/app/models/candidate';
import { EventService } from 'src/app/service/event.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private eventService:EventService,private snackBar:MatSnackBar,private dialog:MatDialog) { }

  eventList!:any[];


  ngOnInit(): void {
    this.getAllEvents()
  }


  getAllEvents(){
    this.eventService.getEventList().subscribe(data=>{
     
      this.eventList = data;
     // console.log(data)
    },error=>{
      this.snackBar.open("Error",'',{duration:3000});
    })
  }

  openDialog(id:number,name:string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {id: id, message: "Are you sure want to delete event",username:name,funId:4},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed'+result);

     this.getAllEvents();
    });
  }
}
