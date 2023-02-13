import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private baseURL = "http://localhost:8080/api/candidate/";

  constructor(private httpClient: HttpClient) { }
  header:HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:alan@123'),
    }
  );
  getCandidateList(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`${this.baseURL}` + 'list',{headers:this.header});
  }
  updateCandidate(candidate:Candidate):Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json')
    return this.httpClient.put<Candidate>(`${this.baseURL}`+'update/'+candidate.id,candidate,{headers:this.header});
    // return this.httpClient.put<>
  }

  createCandidate(candidate: Candidate): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` + 'new', candidate,{headers:this.header});
  }

  deleteCandidate(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}` + 'delete' + '/' + id,{headers:this.header});
  }
}
