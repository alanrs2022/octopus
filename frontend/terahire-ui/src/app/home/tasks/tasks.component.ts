import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private authService:AuthService) { }

  userType!:string;
  
  
  ngOnInit(): void {
    this.userType = this.authService.getRoles();
  }
  


}
