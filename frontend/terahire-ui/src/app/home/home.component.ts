import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import{Notification} from '../models/notification.model'




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

  notificationCount!:number;
  

  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2]


    this.getNotifications();
    this.authService.getServerStatus();
    this.userType = this.authService.getUserTypes();
    console.log(this.userType)

  }


  getNotifications(){
    this.notificationService.getNotifications().subscribe(data => {
      this.nList = data;
     
      this.notificationCount=0;
      this.nList.forEach((obj)=>{
        if(obj.notificationType==0){
          this.notificationCount+=1;
        }
      })
    })
    
  }

  logOut(){
    this.authService.logout();
  }




  

  Logout(){

    this.authService.logout();
    this.router.navigate([""])

  }
 
}
