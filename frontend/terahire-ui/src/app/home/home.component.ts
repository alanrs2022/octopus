import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private notificationService:NotificationService,private authService:AuthService) { }
  
  activeTab:string = "dahboard";
  userType:boolean[]=[];
  nList!:Notification[];
  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2]

    this.getNotifications();
    this.userType = this.authService.getUserTypes();

  }


  getNotifications(){
    this.notificationService.getNotifications().subscribe(data=>{
      this.nList = data;
    })
    
  }

  logOut(){
    this.authService.logout();
  }
 
}
