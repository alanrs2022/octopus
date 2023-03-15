import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../service/password.service';




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
  token!:string;
  hasToken!:boolean

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _passwordService: PasswordService,
    private _snackBar:MatSnackBar,
    private router: Router) 
    {
      this.resetForm = this.formBuilder.group({
        newPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  
    }
    allowAccess(){
      this.activatedRoute.queryParams.subscribe((params)=>{
        this.token = params['token']
        if(this.token){
          this.hasToken=true;
          this._passwordService.tokenChecker(this.token).subscribe((response:any)=>{
            console.log(response);},err=>{
             if(err.status==404){
              this.router.navigate(['**'])
             }
             else{
             }
            });
        }else{
          this.hasToken=false;
          this.router.navigate(['']);
        }
       });
 
    }

  ngOnInit() {
    this.allowAccess()
    console.log(this.token,this.hasToken);
      
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;
      if(this.resetForm.valid && this.resetForm.get('newPassword')?.value ==this.resetForm.get('confirmPassword')?.value){
      
        console.log(this.resetForm.value);
        this.error=false;
        this._snackBar.open("Password has resetted successfully",'',{
          duration:5000
         })
         this._passwordService.resetPassword(this.token,this.resetForm.get('newPassword')?.value).subscribe((response: any) => {
          console.log(response);
        },err=>{
          console.log(err)
        });
         this.router.navigate([''])
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
