import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { user } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }


  baseUrl:string = "http://localhost:8080/api/user/";
  header:HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:alan@123'),
    }
  );
  
  

  

  getAllUsers(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+'list',{headers:this.header})
  }

  updateUser(data:any){
    return this.httpClient.put(`${this.baseUrl}`+'update/'+data.id,data)
  }
  getUserByEmail(email:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+'email/'+email);
  }

  saveUser(data:user){
    return this.httpClient.post(`${this.baseUrl}`+'new',data,{headers:this.header,observe:'response'});
  }

  deleteUser(id:number){
    return this.httpClient.delete(`${this.baseUrl}`+'delete/'+id,{headers:this.header,observe:'response'})
  }
  forgotPassword(data:any){
    return this.httpClient.post(`${this.baseUrl}`+'password/',data,{headers:this.header,observe:'response'})
  }


  getUserList(id: number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+ id,{headers:this.header,observe:'response'});
  }
  updateUserByID(user:user):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}` + 'update/' + user.id, user,{headers:this.header,observe:'response'});
  }
}
