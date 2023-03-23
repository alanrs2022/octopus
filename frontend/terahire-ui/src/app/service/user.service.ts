import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


import { user } from '../models/user.model';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private sharedService:SharedService) { }


  baseUrl:string = this.sharedService.getServerLink()+ "/api/user/";

  
  

  

  getAllUsers(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+'list')
  }

  updateUser(data:any){
    return this.httpClient.put(`${this.baseUrl}`+'update/'+data.id,data)
  }
  getUserByEmail(email:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+'email/'+email);
  }

  saveUser(data:user){
    return this.httpClient.post(`${this.baseUrl}`+'new',data,{observe:'response'});
  }

  deleteUser(id:number){
    return this.httpClient.delete(`${this.baseUrl}`+'delete/'+id,{observe:'response'})
  }
  forgotPassword(data:any){
    return this.httpClient.post(`${this.baseUrl}`+'password/',data,{observe:'response'})
  }


  getUserList(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+ id,{observe:'response'});
  }
  updateUserByID(user:user):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}` + 'update/' + user.id, user,{observe:'response'});
  }
}
