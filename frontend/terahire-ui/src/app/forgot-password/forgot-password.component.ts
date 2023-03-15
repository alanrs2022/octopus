import { PasswordService } from './../service/password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  validEmail!:boolean;

  constructor(private formBuilder:FormBuilder, private _passwordService: PasswordService,
    public dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private _snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
    })
  }
  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    console.log(formData.email);
    this._passwordService.forgotPassword(formData.email).subscribe((value:any)=>{
      if (value.statusCode === 200) {
        this.validEmail=true;
        this._snackBar.open("Submitted Successfully, Check your Email",'',{duration:5000})
        }
    },(err)=>{
      // console.log(err.status);
      if(err.status){
        this.validEmail=false;
        this._snackBar.open("Invalid Email Entered",'',{duration:5000})
      }
      else{
      }

    });
  }


}
