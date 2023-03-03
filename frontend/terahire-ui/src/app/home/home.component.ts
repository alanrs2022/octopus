import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private notificationService:NotificationService) { }
  
  activeTab:string = "dahboard";
  nList!:Notification[];
  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2]

    this.getNotifications();
  }


  getNotifications(){
    this.notificationService.getNotifications().subscribe(data=>{
      this.nList = data;
    })
  }
 
}
