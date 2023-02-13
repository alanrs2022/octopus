import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from 'src/app/models/candidate';

import { CandidateService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.scss']
})
export class CandidateUpdateComponent implements OnInit {

  EditJobData: Candidate;
  name!: string;
  isAlert=false;
  // isDisabled = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidate, private candidateService: CandidateService,private snackBar:MatSnackBar) {
    this.EditJobData = data;
    // this.isDisabled = false;
  }
  UpdatedFullName!: string;
  UpdatedEmail!: string
  UpdatedPhoneNumber!: string;
  UpdatedDOB!: Date;
  UpdatedAddress!: string
  UpdatedCity!: string
  UpdatedCountry!: string
  UpdatedNationality!: string
  UpdatedYOE!: number
  UpdatedCurrentCompany!: string
  UpdatedCurrentPosition!: string
  UpdatedCurrentCTC!: string
  UpdatExpectedCTC!: string
  UpdatedSkills!: string
  UpdatedStatus!: string
  UpdatedGender!:string
  UpdatedSocialLink!:string


  ngOnInit(): void {
    this.UpdatedFullName = this.EditJobData.fullName;
    this.UpdatedEmail = this.EditJobData.email;
    this.UpdatedPhoneNumber = this.EditJobData.phoneNumber;
    this.UpdatedDOB = this.EditJobData.dob;
    this.UpdatedAddress = this.EditJobData.address;
    this.UpdatedCity = this.EditJobData.city;
    this.UpdatedCountry = this.EditJobData.country;
    this.UpdatedNationality = this.EditJobData.nationality;
    this.UpdatedYOE = this.EditJobData.yearOfExperience;
    this.UpdatedCurrentCompany = this.EditJobData.currentCompany;
    this.UpdatedCurrentPosition = this.EditJobData.currentPosition;
    this.UpdatedCurrentCTC = this.EditJobData.currentCTC;
    this.UpdatExpectedCTC = this.EditJobData.expectedCTC;
    this.UpdatedSkills = this.EditJobData.skills;
    this.UpdatedStatus = this.EditJobData.status;
    this.UpdatedGender = this.EditJobData.gender;
    this.UpdatedSocialLink=this.EditJobData.sociaLink;

    // if(this.UpdatedYOE==0){
    //   update= true
    // }
      
  }
  
    

  UpdateJobDetails() {

    let UpdatedCandidateData: Candidate = {
      id: this.EditJobData.id,
      fullName: this.UpdatedFullName,
      email: this.UpdatedEmail,
      phoneNumber: this.UpdatedPhoneNumber,
      gender: this.UpdatedGender,
      dob: this.UpdatedDOB,
      address: this.UpdatedAddress,
      country: this.UpdatedCountry,
      city: this.UpdatedCity,
      zipcode: this.EditJobData.zipcode,
      nationality: this.UpdatedNationality,
      yearOfExperience: this.UpdatedYOE,
      currentCompany: this.UpdatedCurrentCompany,
      currentPosition: this.UpdatedCurrentCompany,
      currentCTC: this.UpdatedCurrentCTC,
      expectedCTC: this.UpdatExpectedCTC,
      skills: this.UpdatedSkills,
      sociaLink: this.UpdatedSocialLink,
      status: this.UpdatedStatus

    }
    console.log(this.UpdatedGender);
    this.candidateService.updateCandidate(UpdatedCandidateData).subscribe(data => {
      console.log(data)

      this.snackBar.open("Successfully updated!!",'',{
        duration:3000
      })
    });

    if (this.data!=null) {
     // this.isAlert=true
      
    }
    // alert("Updated");
    // window.location.reload();


  }

}