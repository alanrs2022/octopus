
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
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

    constructor(private formBuilder: FormBuilder,private authService:AuthService,private snackBar:MatSnackBar,private router:Router) { }

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
}
  

