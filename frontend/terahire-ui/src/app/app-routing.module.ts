import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';


const routes: Routes = [
  {
    path:"home",
    loadChildren: () => import('./home/home.module').then(mod=>mod.HomeModule)
  },
  {
    path:"",
    component: LoginComponent
  },
  
  {
    path:"resetpassword",
    component:PasswordResetComponent
  },
  {
    path:"forgotpassword",
    component:ForgotPasswordComponent
  },
{
   path: '**', pathMatch: 'full', 
    component: ResourceNotFoundComponent ,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
