import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/service/candidate.service';
@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent implements OnInit {

  candidateInfo!: Candidate[];
  
  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.getCandidateInfo();
   
  }
//getting full candidate List  
getCandidateInfo(){
  this.candidateService.getCandidateList().subscribe(data=>{
    this.candidateInfo=data;
    console.log(this.candidateInfo)
  })  
}

//getting candidate status list
getStatus(candidateInfo:Candidate[],condition:string){
  return candidateInfo.filter(c=>c.status==condition)

}

}
