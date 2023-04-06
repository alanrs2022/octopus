import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getServerLink():string{

    return "http://localhost:8080";
  }
  updateChanges(){
    return 
  }
}
