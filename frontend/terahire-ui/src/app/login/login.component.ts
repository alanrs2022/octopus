
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  registerForm!: FormGroup;
    submitted = false;
    error:boolean = false;
    errMessage!:string;
    fieldTextType!: boolean;

    constructor(private formBuilder: FormBuilder,private authService:AuthService,private snackBar:MatSnackBar,private router:Router,private dialog: MatDialog) { }

    ngOnInit() {

        if(this.authService.isLoggedIn()){
            this.router.navigate(["/home/dashboard"])
        }
        this.registerForm = this.formBuilder.group({
            
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    //password view button trigger
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
      }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }else{
            this.authService.authUser(this.registerForm.get('email')?.value,this.registerForm.get('password')?.value).subscribe(data=>{
               //console.log(data)

               if(this.registerForm.get('password')?.value && data.message){

                
                data.message.password = this.registerForm.get('password')?.value;
                localStorage.setItem("currentUser",JSON.stringify(data.message));

                console.log(localStorage.getItem("currentUser"))
                this.error = false;
               
 
                this.snackBar.open(data.status,'',{
                 duration:5000
                })
                
                this.router.navigate(["/home/dashboard"]).catch(reason=>{
                 console.log(reason)
                })
               }
              
               



            },e=>{
                this.error = true;
                this.errMessage = e.error;
               // this.registerForm.get('email')?.setErrors(Validators.email)
            });
            
        }

       
    }

    //ForgetPassword  (Note-> imported MatDialog in appModule.ts)
    handleForgotPasswordAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "550px";
        this.dialog.open(ForgotPasswordComponent, dialogConfig);
    }
}
  
