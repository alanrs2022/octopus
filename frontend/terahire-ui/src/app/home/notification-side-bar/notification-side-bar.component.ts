import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification-side-bar',
  templateUrl: './notification-side-bar.component.html',
  styleUrls: ['./notification-side-bar.component.scss']
})
export class NotificationSideBarComponent implements OnInit {

  constructor(private notificationService:NotificationService,private route:Router) { }

  nList!:any[]
  @Output() changeEvent = new EventEmitter();

  dayList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  
  ngOnInit(): void {
    this.getNotifications()
  }

  updateChange(){
    this.getNotifications();
  }

  getNotifications(){
    this.notificationService.getNotifications().subscribe(data=>{
      this.nList = data;
     // console.log(data)
    })
    
  }


  

  // updating notificationStatustype to 1 by update API
  updateNotification(id:number){
    this.route.navigate(['home/tasks'])
    this.notificationService.updateNotificationStatus(id).subscribe((result:any)=>{
      //console.log(result);
      this.getNotifications()
      this.changeEvent.emit();
      
      //window.location.reload();
    })
  }
  getDay(date){
    return this.dayList[new Date(date).getDay()]
  }
}
