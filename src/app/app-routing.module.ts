import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing/landing.component';
import {FourofourComponent} from './fourofour/fourofour.component';
import {LoginComponent} from './landing/login/login.component';
import {RegisterComponent} from './landing/register/register.component';
import {ForgetPasswordComponent} from './landing/forget-password/forget-password.component';
import {ResetPasswordComponent} from './landing/reset-password/reset-password.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth/auth-guard.services';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminAuthComponent} from './admin/admin-auth/admin-auth.component';
import {AdminCoursesComponent} from './admin/admin-courses/admin-courses.component';
import {AdminCreateCourseComponent} from './admin/admin-create-course/admin-create-course.component';
import {AdminCourseDetailsComponent} from './admin/admin-course-details/admin-course-details.component';
import {AdminCourseEditComponent} from './admin/admin-course-edit/admin-course-edit.component';
import {AdminCreateCoursePathComponent} from './admin/admin-create-course-path/admin-create-course-path.component';
import {AdminCoursePathDetailsComponent} from './admin/admin-course-path-details/admin-course-path-details.component';
import {AdminCoursePathEditComponent} from './admin/admin-course-path-edit/admin-course-path-edit.component';
import {AdminTutorsComponent} from './admin/admin-tutors/admin-tutors.component';
import {AdminCreateTutorComponent} from './admin/admin-create-tutor/admin-create-tutor.component';
import {AdminTutorDetailsComponent} from './admin/admin-tutor-details/admin-tutor-details.component';
import {AdminEditTutorDetailsComponent} from './admin/admin-edit-tutor-details/admin-edit-tutor-details.component';
import {AssignStaffComponent} from './admin/assign-staff/assign-staff.component';
import {AdminStudentsComponent} from './admin/admin-students/admin-students.component';
import {AdminStudentDetailsComponent} from './admin/admin-student-details/admin-student-details.component';
import {AdminEditStudentComponent} from './admin/admin-edit-student/admin-edit-student.component';
import {AdminEnrollStudentComponent} from './admin/admin-enroll-student/admin-enroll-student.component';
import {AdminCreateStudentComponent} from './admin/admin-create-student/admin-create-student.component';
import {AdminEarnComponent} from './admin/admin-earn/admin-earn.component';
import {AdminSupportComponent} from './admin/admin-support/admin-support.component';
import {AdminSupportDetailsComponent} from './admin/admin-support-details/admin-support-details.component';
import {TutorComponent} from './tutor/tutor.component';
import {TutorDashboardComponent} from './tutor/tutor-dashboard/tutor-dashboard.component';
import {TutorAuthComponent} from './tutor/tutor-auth/tutor-auth.component';
import {TutorCoursesComponent} from './tutor/tutor-courses/tutor-courses.component';
import {TutorCourseDetailsComponent} from './tutor/tutor-course-details/tutor-course-details.component';
import {TutorCourseModuleDetailsComponent} from './tutor/tutor-course-module-details/tutor-course-module-details.component';
import {TutorSupportComponent} from './tutor/tutor-support/tutor-support.component';
import {LandingCoursesComponent} from './landing/landing-courses/landing-courses.component';
import {LandingCourseDetailsComponent} from './landing/landing-course-details/landing-course-details.component';
import {LandingSearchComponent} from './landing/landing-search/landing-search.component';
import {MyCoursesComponent} from './student/my-courses/my-courses.component';
import {StudentComponent} from './student/student.component';


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
    path: 'courses', component: LandingCoursesComponent, pathMatch: 'full'
  },
  {
    path: 'course/:id', component: LandingCourseDetailsComponent, pathMatch: 'full'
  },
  {
    path: 'search', component: LandingSearchComponent, pathMatch: 'full'
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
    path: 'student',
    component:StudentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'my-courses', pathMatch: 'full'
      },
      {
        path: 'my-courses', component: MyCoursesComponent
      },
    ]
  },
  {
    path: 'admin-login',
    component: AdminAuthComponent
  },
  {
    path: 'tutor-login',
    component: TutorAuthComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', component: AdminDashboardComponent
      },
      {
        path: 'courses', component: AdminCoursesComponent
      },
      {
        path: 'create-course', component: AdminCreateCourseComponent
      },
      {
        path: 'course-details/:course_id', component: AdminCourseDetailsComponent
      },
      {
        path: 'edit-course/:course_id', component: AdminCourseEditComponent
      },
      {
        path: 'create-course-path/:course_id', component: AdminCreateCoursePathComponent
      },
      {
        path: 'course-enroll-student/:course_id', component: AdminCourseEditComponent
      },
      {
        path: 'course-path-details/:course_id', component: AdminCoursePathDetailsComponent
      },
      {
        path: 'edit-course-path/:course_id', component: AdminCoursePathEditComponent
      },
      {
        path: 'tutors', component: AdminTutorsComponent
      },
      {
        path: 'create-tutor', component: AdminCreateTutorComponent
      },
      {
        path: 'tutor-details/:id', component: AdminTutorDetailsComponent
      },
      {
        path: 'edit-tutor-details/:id', component: AdminEditTutorDetailsComponent
      },
      {
        path: 'assign-tutor/:type/:id', component: AssignStaffComponent
      },
      {
        path: 'students', component: AdminStudentsComponent
      },
      {
        path: 'student-details/:studentId', component: AdminStudentDetailsComponent
      },
      {
        path: 'edit-student-details/:studentId', component: AdminEditStudentComponent
      },
      {
        path: 'create-student', component: AdminCreateStudentComponent
      },
      {
        path: 'enroll-student/:type/:studentId', component: AdminEnrollStudentComponent
      },
      {
        path: 'earns', component: AdminEarnComponent
      },
      {
        path: 'support', component: AdminSupportComponent
      },
      {
        path: 'support-details/:supportId', component: AdminSupportDetailsComponent
      }

    ]
  },
  {
    path: 'tutor',
    component: TutorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', component: TutorDashboardComponent
      },
      {
        path: 'courses', component: TutorCoursesComponent
      },
      {
        path: 'course-details/:courseId', component: TutorCourseDetailsComponent
      },
      {
        path: 'course-path-details/:course_id', component: TutorCourseModuleDetailsComponent
      },
      {
        path: 'support', component: TutorSupportComponent
      }
    ]
  },
  {
    path: '*', component: FourofourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
