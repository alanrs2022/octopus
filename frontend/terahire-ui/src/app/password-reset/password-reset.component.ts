import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetForm!: FormGroup;
  submitted = false;
  error:boolean = false;
  errMessage!:string;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _snackBar:MatSnackBar) 
    {
      this.resetForm = this.formBuilder.group({
        newPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  
    }

  ngOnInit() {
    // this._authService.validPasswordToken(this.router.url);
  

  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;
      if(this.resetForm.valid && this.resetForm.get('newPassword')?.value ==this.resetForm.get('confirmPassword')?.value){
      
        console.log(this.resetForm.value);
        this.error=false;
        this._snackBar.open("Submitted",'',{
          duration:5000
         })
         
      }
      else{
        this._snackBar.open("Password does not match",'',{
          duration:5000
         })
         console.log(this.resetForm.value);
        return;
      }
  }
}
