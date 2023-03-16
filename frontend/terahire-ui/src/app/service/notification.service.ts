
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private httpClient:HttpClient) { }

  private baseURL="http://localhost:8080/api/notification";



  getNotifications(): Observable<any> {
    // return this.httpClient.get(this.baseURL+'/list',{headers:this.header})
    return this.httpClient.get(this.baseURL + '/list', {  });
  }
  updateNotificationStatus(id): Observable<any>{
    return this.httpClient.put(this.baseURL + '/update/'+ id, {  });

  }
}
