import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL="http://localhost:8080/api/calendar"
  constructor(private httpClient: HttpClient) { }
  header:HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:alan@123'),
    }
  );
  // getEventList(event:Event)
  createEvent(event:Event):Observable<any>{
    return this.httpClient.post(this.baseURL+'/new',event,{headers:this.header,observe:'response'})

  }
  deleteEvent(id:number){
    return this.httpClient.delete(this.baseURL+`/delete`+id,{reportProgress:true,headers:this.header});
  }
  updateEvent(event:Event):Observable<any>
  {
    return this.httpClient.put<any>(this.baseURL+`/update/`+event.id,event,{headers:this.header})
  }

}

