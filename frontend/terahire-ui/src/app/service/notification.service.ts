
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'n111/postcss-selector-parser/postcss-selector-parser';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private httpClient:HttpClient) { }

  private baseURL="http://localhost:8081/api/notification";


  getNotifications():Observable<any>{
    return this.httpClient.get(this.baseURL+"/list",{})

  constructor(private httpClient: HttpClient) { }

 private baseURL = "http://localhost:8080/api/notification";

  header: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:alan@123'),
    }
  );


  getNotifications(): Observable<any> {
    // return this.httpClient.get(this.baseURL+'/list',{headers:this.header})
    return this.httpClient.get(this.baseURL + '/list', { headers: this.header });
  }
  updateNotificationStatus(id): Observable<any>{
    return this.httpClient.put(this.baseURL + '/update/'+ id, { headers: this.header });

  }
}
