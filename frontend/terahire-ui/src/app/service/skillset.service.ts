import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillSet } from '../models/skillset';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsetService {

  private baseURL = this.sharedService.getServerLink()+  "/api/skills/";

  constructor(private httpClient:HttpClient,private sharedService:SharedService) { }

  
  getSkillSet(): Observable<SkillSet[]> {
    return this.httpClient.get<SkillSet[]>(`${this.baseURL}` + 'list',);
  }
}
