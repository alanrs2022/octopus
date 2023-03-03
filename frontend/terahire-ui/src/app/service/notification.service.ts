import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }

  private baseURL="http://localhost:8081/api/notification";


  getNotifications():Observable<any>{
    return this.httpClient.get(this.baseURL+"/list",{})
  }
}
