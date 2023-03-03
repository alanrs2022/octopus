import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventGeneratorComponent } from 'src/app/home/dashboard/event/event-generator/event-generator.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  eventClicked(): void{
    this.dialog.open(EventGeneratorComponent,{ 
      height:'70%',
      width:'30%'
    })
  }

}
