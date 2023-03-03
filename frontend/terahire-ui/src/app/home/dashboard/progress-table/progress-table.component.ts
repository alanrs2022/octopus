import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.scss']
})
export class ProgressTableComponent implements OnInit {

  constructor(private eventService:EventService ) { }

  eventList!:any;
  ngOnInit(): void {
    this.getEvents()
  }

  getEvents(){
    this.eventService.getEventList().subscribe(data=>{
      this.eventList = data;
    })
  }

}
