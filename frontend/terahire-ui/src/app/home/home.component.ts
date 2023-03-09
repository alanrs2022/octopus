import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import{Notification} from '../models/notification.model'
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private notificationService:NotificationService,private authService:AuthService) { }
  
  activeTab:string = "dahboard";
  notificationCount!:number;
  
  
  nList: Notification[] = [];
  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2]

    this.getNotifications1();
  }

// showing notification
  getNotifications1(){
    this.notificationService.getNotifications().subscribe(data => {
      this.nList = data;
      console.log(data)
      this.notificationCount=0;
      this.nList.forEach((obj)=>{
        if(obj.notificationType==0){
          this.notificationCount+=1;
        }
      })
    })
  }

  // updating notificationStatustype to 1 by update API
  updateNotification(id:number){
    this.notificationService.updateNotificationStatus(id).subscribe((result:any)=>{
      console.log(result);
      window.location.reload();
    })
  }

  Logout(){

    this.authService.logout();
    this.router.navigate([""])
  }
 
}
