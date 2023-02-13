import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobComponent } from './job-registration/job-registration.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path:"",
    component: TasksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
