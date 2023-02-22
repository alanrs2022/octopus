import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseURL="http://localhost:8080/api/job";
  
  constructor(private httpClient: HttpClient) {}

  header:HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('alanrs@gmail.com:Alanrs@1234'),
    }
  );
  
  getJobList():Observable<any>{
    
    return this.httpClient.get(this.baseURL+'/list',{headers:this.header});
  }
  createJob(job:Job):Observable<any>{
    return this.httpClient.post(this.baseURL+'/new',job,{headers:this.header});
  }
  updateJob(job:Job):Observable<any>{

    
    return this.httpClient.put<any>(`${this.baseURL}/update/${job.id}`,job,{headers:this.header});
  }
  deleteJob(id:number){
    console.log("Deleting with ID:"+id);
    return this.httpClient.delete(this.baseURL+'/delete/'+id,{reportProgress:true,headers:this.header});
  }
}
