import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from 'src/app/models/candidate';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private eventService:EventService,private snackBar:MatSnackBar) { }

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

}
