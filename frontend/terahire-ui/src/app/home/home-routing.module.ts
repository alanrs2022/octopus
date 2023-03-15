import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './dashboard/event/event.component';
import { HomeComponent } from './home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';


authService:AuthService;
const routes: Routes = [



  {
    path:"",
    component:HomeComponent,
    children:[
      {
        path:"dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then(mod=> mod.DashboardModule)
      },
      {
        path:"recruitment",
        component: RecruitmentComponent
      },
      {
        path:"administration",
        loadChildren:()=> import("./admin/admin.module").then(mod=>mod.AdminModule)
      },{
        path:"calendar",
        component: EventComponent
      }
      ,{
        path:"tasks",
        loadChildren:()=> import("./tasks/tasks.module").then(mod=>mod.TasksModule),
        
      }
      ,{
        path:"settings",
        component: SettingsComponent
      },
      {
        path:"MyProfile",
        component: MyProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
