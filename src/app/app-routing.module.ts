import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing/landing.component';
import { FourofourComponent } from './fourofour/fourofour.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { ForgetPasswordComponent } from './landing/forget-password/forget-password.component';
import { ResetPasswordComponent } from './landing/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '', component: LandingComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: 'forgot-password', component: ForgetPasswordComponent
  },
  {
    path: 'reset-password/:token', component: ResetPasswordComponent
  },
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '*', component: FourofourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
