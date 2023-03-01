import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillSet } from '../models/skillset';

@Injectable({
  providedIn: 'root'
})
export class SkillsetService {

  private baseURL = "http://localhost:8080/api/skills/";

  constructor(private httpClient:HttpClient) { }
  header:HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:alan@123'),
    }
  );
  getSkillSet(): Observable<SkillSet[]> {
    return this.httpClient.get<SkillSet[]>(`${this.baseURL}` + 'list',{headers:this.header});
  }
}
