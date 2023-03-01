
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    registerForm!: FormGroup;
    submitted = false;
    //password eye
  fieldTextType!: boolean;

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({

            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    //password eye symbol
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    //ForgetPassword  (Note-> imported MatDialog in appModule.ts)
    handleForgotPasswordAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "550px";
        this.dialog.open(ForgotPasswordComponent, dialogConfig);
    }
}


