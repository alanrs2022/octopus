import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user!: user;
  edit: boolean = true;
  @ViewChild('phoneNumber') phone!:ElementRef;
  

  constructor(private userService: UserService, private router: Router,private authService:AuthService,private snackBar:MatSnackBar) { }

  ngOnInit() {
     this.getCurrentUser()
  }
 
  
// update list of users
  // update():void{
  //   console.log(this.user)
  //   this.userService.updateUser(this.user).subscribe((result:any)=>{})    
  //   window.location.reload();
  //   alert("updated")   
  // }

  getCurrentUser(){
    
    const authUser = JSON.parse(this.authService.currentUserValue())
    this.userService.getUserByEmail(authUser.username).subscribe(data=>{
      this.user =  data; 
    })

  }

  update():void{
    console.log(this.user)
    this.userService.updateUserByID(this.user).subscribe((result:any)=>{
      this.snackBar.open("Successfully updated.",'',{duration:3000});
    },err=>{
      this.snackBar.open("Update failed.",'',{duration:3000});
    
    })    
   // window.location.reload();
     
  
  }
}
