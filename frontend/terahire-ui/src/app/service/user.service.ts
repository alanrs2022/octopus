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

  
  

  

  getAllUsers(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`+'list')
  }

  updateUser(data:user){
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
}
