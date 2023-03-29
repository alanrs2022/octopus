import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getServerLink():string{

    return "http://172.31.218.123:8080";
  }
  updateChanges(){
    return 
  }
}
