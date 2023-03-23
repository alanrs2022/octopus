import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseURL= this.sharedService.getServerLink()+ "/api/passwordcontroller";
  constructor(private httpClient:HttpClient,private sharedService:SharedService) { }
  
  resetPassword(validToken:string, newPassword:string):Observable<any>{
    const params = new HttpParams({
      fromObject: {
        token: validToken,
        password: newPassword,
      }
    });
    return this.httpClient.post(`${this.baseURL}/reset_password`,null,{params: params});
  }

  forgotPassword(validEmail:string):Observable<any>{
    // const params = new HttpParams({
    //   fromObject:{
    //     email:validEmail,
    //   }
    // })
    return this.httpClient.post(`${this.baseURL}/forgot_password`,validEmail);
  }      

  tokenChecker(token:string):Observable<any>{
    return this.httpClient.get(`${this.baseURL}`+`/reset_password/token/`+token);
  }
}