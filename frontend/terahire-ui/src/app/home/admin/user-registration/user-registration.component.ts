import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { FloatLabelType } from '@angular/material/form-field';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  userRegisterForm!: FormGroup;
  submitted = false;
  @Output() changeList = new EventEmitter();

  @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  phonenumber?: NgxMatIntlTelInputComponent;

  userCreating:boolean = false;
   //phone number country code
   hideRequiredControl = new FormControl(false);
   floatLabelControl = new FormControl('auto' as FloatLabelType);
   options = this.formBuilder.group({
     hideRequired: this.hideRequiredControl,
     floatLabel: this.floatLabelControl,
   });

  //password eye
  fieldTextType!: boolean;
  constructor(private formBuilder: FormBuilder,private userService:UserService,private _snackBar: MatSnackBar) { }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

 

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({   
      firstName: ['',[Validators.required]],
      lastname:['',[Validators.required]],   
      username:['',[Validators.required]],    
      email: ['', [Validators.required, Validators.email]],
      role:['',[Validators.required]],  
      phonenumber: ['',[Validators.required]],
      // password:['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.minLength(8)]]   
  });
  }

  get f() { return this.userRegisterForm.controls; }

  //password eye symbol
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }



  openSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000
    })
   
  }

  
    onSubmit() {
        this.submitted = true;
        this.userCreating = true;
        // stop here if form is invalid
        if (this.userRegisterForm.invalid) {

          this.userCreating = false;

            return;
        }else{
          let userData:user ={
            id:0,
            firstName:this.userRegisterForm.get('firstName')?.value,
            lastName:this.userRegisterForm.get('lastname')?.value,
            username:this.userRegisterForm.get('username')?.value,
            statusId:102,
            userTypeId:this.userRegisterForm.get('role')?.value,
            modifiedDate:"",
            createdDate:"",
            email:this.userRegisterForm.get('email')?.value,
            // password:this.userRegisterForm.get('password')?.value,
            phoneNumber: this.userRegisterForm.get('phonenumber')?.value
      
          }

          this.userService.saveUser(userData).subscribe(data=>{
            if(data){
              this.userCreating = false;
              this.openSnackBar("Successfully created!")
              this.changeList.emit();
              this.userRegisterForm.clearValidators();
              this.userRegisterForm.reset();

              this.userRegisterForm.get("phonenumber")?.clearValidators();
              this.userRegisterForm.get("phonenumber")?.reset();
              this.submitted = false;
              this.phonenumber?.reset();
              this.submitted = false;
              this.userService.getAllUsers();

              
              console.log(JSON.parse(JSON.stringify(data.body)).message)
              
            }
          },(e)=>{
            console.log(e)

            this.userCreating = false;

            this.openSnackBar(e.error.message+" Failed!!")
          })


        }
        // Object.keys(this.userRegisterForm.controls).forEach(key => {
        //   const control = this.userRegisterForm.controls[key];
        //   control.markAsUntouched();
        // });
       
        
        
        
    }

}
