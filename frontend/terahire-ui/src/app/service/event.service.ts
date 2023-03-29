import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL= this.sharedService.getServerLink()+ "/api/calendar"
  constructor(private httpClient: HttpClient,private sharedService:SharedService) { }

  // getEventList(event:Event)

  getEventList():Observable<any>{
     return this.httpClient.get(this.baseURL+'/list');
    }
  createEvent(event:Event):Observable<any>{
    return this.httpClient.post(this.baseURL+'/new',event,{observe:'response'})

  }
  deleteEvent(id:number){
    return this.httpClient.delete(this.baseURL+`/delete/`+id,{reportProgress:true});
  }
  updateEvent(event:Event):Observable<any>
  {
    return this.httpClient.put<any>(this.baseURL+`/update/`+event.id,event,{})
  }

}

