import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {
  }
  checkCheckBoxvalue(event: any ){
    if(event.target.checked == true)
    {
      this.document.body.classList.add('test');
    }
    else
    {
      this.document.body.classList.remove('test');
    }
    
  }
}
