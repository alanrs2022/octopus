import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private sharedService:SharedService,private authService:AuthService) {
    
   }

  ngOnInit(): void {
    this.authService.getServerStatus();
  }

}
