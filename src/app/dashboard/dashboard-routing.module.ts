import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth-guard.services';
import { AccountComponent } from './account/account.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [

      { path: '', redirectTo: '/dashboard/account', pathMatch: 'full', canActivate: [AuthGuard] },

      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },

      { path: 'course-categories', component: CategoriesComponent, canActivate: [AuthGuard] },

      { path: 'category/:courseid', component: CategoryDetailsComponent, canActivate: [AuthGuard] },

      { path: 'course/:courseid', component: CourseInfoComponent, canActivate: [AuthGuard] },

      { path: 'enroll-now/:courseid', component: EnrollNowComponent, canActivate: [AuthGuard] },

      { path: 'my-course', component: AccountComponent, canActivate: [AuthGuard] }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
