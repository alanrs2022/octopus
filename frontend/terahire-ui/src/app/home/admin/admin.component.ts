import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService) { }
  userList = new MatTableDataSource<user>();
  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(){
    // this.openSnackBar("Updating...")
     this.userService.getAllUsers().subscribe(data =>{
      this.userList.data = data;
     },error=>{
      
     })
     
   }

}
