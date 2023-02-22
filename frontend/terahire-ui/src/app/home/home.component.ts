import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService,private userService:UserService) { }
  
  activeTab:string = "dashboard";
  userRoles!:[];
  currentUser:any;
  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2];
   // this.router.isActive("/home/dashboard",true)
   this.getCurrentUser()


  }

  
  getCurrentUser(){
    
    const authUser = JSON.parse(this.authService.currentUserValue())
    //console.log(authUser.authorities)
    this.userRoles = authUser.authorities

  }


  logOut(){
    this.authService.logout();
  }

}
