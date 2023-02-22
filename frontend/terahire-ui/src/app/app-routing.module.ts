import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './home/admin/admin.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RecruitmentComponent } from './home/recruitment/recruitment.component';
import { SettingsComponent } from './home/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path:"home",
    loadChildren: () => import('./home/home.module').then(mod=>mod.HomeModule),
  },
  {
    path:"",
    component: LoginComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
