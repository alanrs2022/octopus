import { Element } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { calendar } from 'src/app/models/calendar.model';
import { MatDialog } from '@angular/material/dialog';
import { EventGeneratorComponent } from 'src/app/event-generator/event-generator.component';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/service/event.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  
  
})
export class CalendarComponent implements OnInit {

  constructor(private dialog: MatDialog, private _eventService:EventService) { }

  ngOnInit(): void {
   
    this.renderCalendar();
    this.eventListener();
   
  }
  eventClicked(): void{
    this.dialog.open(EventGeneratorComponent,{ 
      height:'70%',
      width:'60%'
    })
  }



// daysTag = document.querySelector(".days");
// currentDate = document.querySelector(".current-date");

@ViewChild('days') daysTag!:ElementRef; 

@ViewChild('currentdate') currentDate!:ElementRef;

prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
date:Date = new Date();
currYear = this.date.getFullYear();
currMonth = this.date.getMonth();
liTag:calendar[]=[];
eventStartTag:calendar[]=[];
eventEndTag:calendar[]=[];
eventList:Event[]=[];
// storing full name of all months in array
months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

renderCalendar()  {
    let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate(); // getting last date of previous month
    

    for (let i = firstDayofMonth; i > 0; i--) { 
      // creating li of previous month last days

      let data:calendar = {
        date:lastDateofLastMonth - i + 1,
        className: "inactive"
      }
      this.liTag.push(data)
     //   this.liTag += ;
    }

    


    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
       
        let isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth() 
                     && this.currYear === new Date().getFullYear() ? "active" : "";
        
                     let data:calendar = {
                      date: i ,
                      className: `${isToday}`
                    }
                    this.liTag.push(data)
        // this.liTag.push(`<li class="${isToday}">${i}</li>`);
                  
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
      let data:calendar = {
        date: i - lastDayofMonth + 1,
        className: `inactive`
      }
      this.liTag.push(data)
        // this.liTag.push(`<li class="inactive">${i - lastDayofMonth + 1}</li>`);
    }
   // console.log(this.liTag)
    // this.currentDate.nativeElement.innerHTML = `${this.months[this.currMonth]} ${this.currYear}`; // passing current mon and yr as currentDate text
    // this.daysTag.nativeElement.innerHTML = this.liTag;
}
changeMonth(button:number){
// adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    this.currMonth = button === 0 ? this.currMonth - 1 : this.currMonth + 1;
    if(this.currMonth < 0 || this.currMonth > 11) { // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
        this.currYear = this.date.getFullYear(); // updating current year with new date year
        this.currMonth = this.date.getMonth(); // updating current month with new date month
    } else {
        this.date = new Date(); // pass the current date as date value
    }
    
    this.liTag = [];
    this.renderCalendar(); // calling renderCalendar function
}
eventListener(){
  this._eventService.getEventList().subscribe(data=>{this.eventList=data})
  for(let event = 0;event<=this.eventList.length;event++){
      let data1:calendar = {
        date:this.eventList[event].start.getDate(),
        className:"EventStart"
      }
      let data2:calendar={
        date:this.eventList[event].end.getDate(),
        className:"EventEnd"
      }
      this.eventStartTag.push(data1);
      this.eventEndTag.push(data2);
      console.log(this.eventStartTag,this.eventEndTag);
      // console.log("Event Start & End date");
      this.liTag.concat(this.eventStartTag,this.eventEndTag);
    }
}

}
