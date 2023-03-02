import { Component, OnChanges, OnInit } from '@angular/core';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/service/candidate.service';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  candidate: Candidate = new Candidate();
  candidateForm!: FormGroup;
  submitted = false;
  message!     : string;
  isAlert=false;
  

  


  constructor(private formBuilder: FormBuilder, private candidateService: CandidateService, private router: Router,private snackBar:MatSnackBar) {
    
   }

  ngOnInit() {

    this.candidateForm = this.formBuilder.group({

      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      currentCompany: ['', [Validators.required]],
      currentPosition: ['', [Validators.required]],
      currentCTC: ['', [Validators.required]],
      expectedCTC: ['', [Validators.required]],
      yearOfExperience: ['', [Validators.required]],
      status: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      sociaLink: ['', [Validators.required]],
      gender: ['female']

    });


    //console.log(this.candidateForm)





    // for disabling input fields
    var options = {
      onlySelf: true,
      emitEvent: false,
    }
    this.candidateForm.get('yearOfExperience')!.valueChanges.subscribe((x) => {

      if (x == '0') {
        this.candidateForm.get('currentCompany')!.disable(options);
        this.candidateForm.get('currentPosition')!.disable(options);
        this.candidateForm.get('currentCTC')!.disable(options);
        this.candidateForm.get('expectedCTC')!.disable(options);
      }
      else{
        this.candidateForm.get('currentCompany')!.enable(options);
        this.candidateForm.get('currentPosition')!.enable(options);
        this.candidateForm.get('currentCTC')!.enable(options);
        this.candidateForm.get('expectedCTC')!.enable(options);
      }
    })
    
  

  }


  // ngOnChanges() {
  //   console.log(this.candidateForm.get('phoneNumber'))
  // }

  OnClick() {
    console.log("testing");
    console.log(this.candidateForm);
  }

  get f() { return this.candidateForm.controls; }

  //saving created candidates
  saveCandidate() {
    //checking for frontend validation
    console.log(this.candidateForm.get('phoneNumber')!.errors);
    if (!this.candidateForm.valid) {
      console.log("submit blocked")
    } else {
      this.candidateService.createCandidate(this.candidate).subscribe({
        next: (data:any) => {
          console.log(data);
          this.snackBar.open("Successfully created.",'',{
            duration:3000
          })
          // this.goToCandidateList();
        },
        error: (e:any) => console.error(e)
      });
    }


  }
  //<--  Page navigation -->

  // goToCandidateList() {
  //   this.router.navigate(['/candidateList']);

  // }

  onSubmit() {
    this.candidate = this.candidateForm.value;


    // this.candidate.sociaLink = 'https://www.linkedin.com/in';
    // this.candidate.fullName=this.candidateForm.get("fullName").value;
    // this.candidate.email=this.candidateForm.get("email").value;
    // this.candidate.phoneNumber=this.candidateForm.get("phoneNumber").value;
    // this.candidate.gender=this.candidateForm.get("gender").value;
    // this.candidate.dob=this.candidateForm.get("dob").value;
    // this.candidate.address=this.candidateForm.get("address").value;
    // this.candidate.zipcode=this.candidateForm.get("zipcode").value;
    // this.candidate.country=this.candidateForm.get("country").value;
    // this.candidate.city=this.candidateForm.get("city").value;
    // this.candidate.nationality=this.candidateForm.get("nationality").value;
    // this.candidate.yearOfExperience=this.candidateForm.get("yearOfExperience").value;
    // this.candidate.currentCTC=this.candidateForm.get("currentCTC").value;
    // this.candidate.expectedCTC=this.candidateForm.get("expectedCTC").value;
    // this.candidate.currentCompany=this.candidateForm.get("currentCompanyc").value;
    // this.candidate.currentPosition=this.candidateForm.get("currentPosition").value;
    // this.candidate.skills=this.candidateForm.get("skills").value;
    // this.candidate.sociaLink=this.candidateForm.get("sociaLink").value;
    // this.candidate.status=this.candidateForm.get("status").value;


    console.log(this.candidateForm.value);

    this.saveCandidate()
    this.submitted = true;

    if (this.candidateForm.valid) {
     // this.isAlert=true
      
    }
    
    

    // stop here if form is invalid
    if (this.candidateForm.invalid) {

     
      return;
    }
    // alert('SUCCESS');
    // if(this.candidateForm.valid && this.submitted){
    //   window.location.reload();
    // }
   this.candidateForm.clearValidators();
   this.candidateForm.reset();
   this.submitted=false;
    
  }

  



}
