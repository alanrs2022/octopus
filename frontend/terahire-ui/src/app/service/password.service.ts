import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseURL="http://localhost:8080/api/passwordcontroller";
  constructor(private httpClient:HttpClient) { }
  
  resetPassword(token:string, newPassword:string):Observable<any>{
    let httpParams = new HttpParams()
    .set('token',token)
    .set('password',newPassword);
  //   let httpParams = {
  //     params : {
  //      'token' : token,
  //      'password' : newPassword
  //     }
  //  }
    return this.httpClient.post(this.baseURL+`/reset_password`,{params:httpParams});
  }

  forgotPassword(mail:string):Observable<any>{
    return this.httpClient.post(this.baseURL+`/forgot_password`,{params:mail});
  }      

  tokenChecker(tokenURL:string):Observable<any>{
    let regex = /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/i;
    let token = regex.exec(tokenURL);
    return this.httpClient.get(`${this.baseURL}`+`/token/`+token![0]);
  }

                      
}