import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventGeneratorComponent } from './event-generator/event-generator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';





@NgModule({
    declarations: [
        AppComponent,
       LoginComponent,
       EventGeneratorComponent,      
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,

        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatSnackBarModule,
        MatProgressSpinnerModule


        MatSnackBarModule,
        MatProgressSpinnerModule

    ]
})
export class AppModule { }
