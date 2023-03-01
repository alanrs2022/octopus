import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user!: user;
  edit: boolean = true;
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser();    
  }
 
  
// update list of users
  // update():void{
  //   console.log(this.user)
  //   this.userService.updateUser(this.user).subscribe((result:any)=>{})    
  //   window.location.reload();
  //   alert("updated")   
  
  // }

  //geting list of users
  getUser():any {
    this.userService.getUserList(this.user.id).subscribe((response: any) => {
      // this.user = response;
      console.log(response.body);
      this.user= response.body;
    })
  }
  update():void{
    console.log(this.user)
    this.userService.updateUserByID(this.user).subscribe((result:any)=>{})    
    window.location.reload();
    alert("updated")   
  
  }
}
