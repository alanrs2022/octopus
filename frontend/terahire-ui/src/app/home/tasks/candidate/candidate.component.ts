
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';




// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { Candidate } from 'src/app/models/candidate';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { CountryService } from 'src/app/service/country.service';
import { JobService } from 'src/app/service/job.service';
import { SkillsetService } from 'src/app/service/skillset.service';




@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  // @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  // phoneNumber?: NgxMatIntlTelInputComponent;
  candidate: Candidate = new Candidate();
  candidateForm!: FormGroup;
  submitted = false;
  message!: string;
  isAlert = false;
  countries: any[] = [];
  jobs: any[] = [];
  skill: any[] = [];
  


  //phone number country code
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  constructor(private authService:AuthService, private countryService: CountryService, private jobService: JobService, private SkillsetService: SkillsetService, private formBuilder: FormBuilder, private candidateService: CandidateService, private router: Router, private snackBar: MatSnackBar) {

  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {


   
    this.getCountries();
    this.getJobs();
    this.getSkills();
    this.candidateForm = new FormGroup({

      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      // phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      currentCompany: new FormControl('', [Validators.required]),
      currentPosition: new FormControl('', [Validators.required]),
      currentCTC: new FormControl('', [Validators.required]),
      expectedCTC: new FormControl('', [Validators.required]),
      yearOfExperience: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      sociaLink: new FormControl('', [Validators.required]),
      gender: new FormControl(['female']),
      designation: new FormControl('', [Validators.required]),
    });


    console.log(this.candidateForm)
    this.candidateForm.get('country')?.valueChanges.subscribe((x: any) => {
      console.log(x)
    })




    // for disabling input fields
    var options = {
      onlySelf: true,
      emitEvent: false,
    }
    this.candidateForm.get('yearOfExperience')!.valueChanges.subscribe((x: string) => {

      if (x == '0') {
        this.candidateForm.get('currentCompany')!.disable(options);
        this.candidateForm.get('currentPosition')!.disable(options);
        this.candidateForm.get('currentCTC')!.disable(options);
        this.candidateForm.get('expectedCTC')!.disable(options);
      }
      else {
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
        next: (data: any) => {
          console.log(data);
          this.snackBar.open("Successfully created.", '', {
            duration: 3000
          })
          // this.goToCandidateList();
        },
        error: (e: any) => console.error(e)
      });
    }


  }
  //<--  Page navigation -->

  // goToCandidateList() {
  //   this.router.navigate(['/candidateList']);

  // }

  onSubmit() {
    this.submitted = true;
    this.candidate = this.candidateForm.value;
    console.log(this.candidateForm)
    console.log(this.candidateForm.value);


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




    if (this.candidateForm.invalid) {


      return;
    }

    if (this.candidateForm.valid) {
      // this.isAlert=true
      this.saveCandidate()

    }



    // stop here if form is invalid

    // alert('SUCCESS');
    // if(this.candidateForm.valid && this.submitted){
    //   window.location.reload();
    // }
    //this.candidateForm.clearValidators();



    Object.keys(this.candidateForm.controls).forEach(key => {
      const control = this.candidateForm.controls[key];
      control.markAsUntouched();
    });
    this.candidateForm.reset();
    // this.phoneNumber?.reset();
    this.candidateForm.get('phoneNumber')?.clearValidators();
    this.submitted = false;

  }
  resetForm() {


    console.log(this.candidateForm.get("phoneNumber")?.value);
    console.log(this.candidateForm.get("phoneNumber"));
    this.candidateForm.reset();
  }
  getCountries() {
    this.countryService.getCountry().subscribe((data: any[]) => {

      this.countries = data;
      this.countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
      console.log("countries", data)
      console.log(this.countries[100].name.common)
    })
  }

  getJobs() {
    this.jobService.getJobList().subscribe((data: any[]) => {
      this.jobs = data;
      // console.log(data)
    })

  }
  getSkills() {
    this.SkillsetService.getSkillSet().subscribe((data: any[]) => {
      this.skill = data;
      console.log(data);
    })
  }


}
