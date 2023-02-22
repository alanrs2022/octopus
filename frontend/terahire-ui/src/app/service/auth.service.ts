import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth } from '../models/auth.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private httpClient:HttpClient,private userService:UserService) { 
    
  }

  private baseURL="http://localhost:8080/api/auth/login";



  authUser(email:string,pass:string):Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,{"username":email,"password":pass});
  }

  public currentUserValue():any {
    return localStorage.getItem("currentUser");
}


// getUserDetails(){
//   let data:any = localStorage.getItem("currentUser");
//   let user = this.userService.getUserByEmail(data.username);

// }
isLoggedIn():boolean{

  
  if(this.currentUserValue() != null){
    return true;
  }else{
    return false;
  }
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  
}
}
