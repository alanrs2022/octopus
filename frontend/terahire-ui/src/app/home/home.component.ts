import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  
  activeTab:string = "dahboard";
  
  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.activeTab =  this.router.url.split('/')[2]
  }

 
}
