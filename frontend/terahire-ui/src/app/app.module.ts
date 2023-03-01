import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent

    ],
    providers: [
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
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule




    ]
})
export class AppModule { }
