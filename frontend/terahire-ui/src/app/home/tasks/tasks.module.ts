import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { JobComponent } from './job-registration/job-registration.component';
import { JobListComponent } from './job-list/job-list.component';

import { JobEditComponent } from './job-edit/job-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   
    
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
    
  ]
})
export class TasksModule { }
