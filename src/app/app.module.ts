import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing/landing.component';
import {LoginComponent} from './landing/login/login.component';
import {RegisterComponent} from './landing/register/register.component';
import {ForgetPasswordComponent} from './landing/forget-password/forget-password.component';
import {ResetPasswordComponent} from './landing/reset-password/reset-password.component';
import {FourofourComponent} from './fourofour/fourofour.component';
import {NotificationComponent} from './alert/notification/notification.component';
import {AuthService} from './auth/auth.service';
import {DataService} from './common/data.service';
import {UiService} from './common/ui.service';
import {AuthHttpInterceptor} from './auth/auth-http-interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminAuthComponent} from './admin/admin-auth/admin-auth.component';
import {AdminNavbarComponent} from './admin/component/admin-navbar/admin-navbar.component';
import {AdminFooterComponent} from './admin/component/admin-footer/admin-footer.component';
import {AdminSidebarComponent} from './admin/component/admin-sidebar/admin-sidebar.component';
import {AdminCoursesComponent} from './admin/admin-courses/admin-courses.component';
import {AdminCreateCourseComponent} from './admin/admin-create-course/admin-create-course.component';
import {CKEditorModule} from 'ngx-ckeditor';
import {AlertNotificationComponent} from './alert/alert-notification/alert-notification.component';
import {AdminCourseDetailsComponent} from './admin/admin-course-details/admin-course-details.component';
import {AdminCourseEditComponent} from './admin/admin-course-edit/admin-course-edit.component';
import {AdminCreateCoursePathComponent} from './admin/admin-create-course-path/admin-create-course-path.component';
import {AdminCreateCourseEnrollStudentComponent} from './admin/admin-create-course-enroll-student/admin-create-course-enroll-student.component';
import {AdminCoursePathDetailsComponent} from './admin/admin-course-path-details/admin-course-path-details.component';
import {AdminCoursePathEditComponent} from './admin/admin-course-path-edit/admin-course-path-edit.component';
import {AdminTutorsComponent} from './admin/admin-tutors/admin-tutors.component';
import {AdminCreateTutorComponent} from './admin/admin-create-tutor/admin-create-tutor.component';
import {AdminTutorDetailsComponent} from './admin/admin-tutor-details/admin-tutor-details.component';
import {PreviewServiceComponent} from './admin/component/preview-service/preview-service.component';
import {AdminEditTutorDetailsComponent} from './admin/admin-edit-tutor-details/admin-edit-tutor-details.component';
import {AssignStaffComponent} from './admin/assign-staff/assign-staff.component';
import {AdminStudentsComponent} from './admin/admin-students/admin-students.component';
import {AdminStudentDetailsComponent} from './admin/admin-student-details/admin-student-details.component';
import {AdminEditStudentComponent} from './admin/admin-edit-student/admin-edit-student.component';
import {AdminCreateStudentComponent} from './admin/admin-create-student/admin-create-student.component';
import {AdminEnrollStudentComponent} from './admin/admin-enroll-student/admin-enroll-student.component';
import {AdminEarnComponent} from './admin/admin-earn/admin-earn.component';
import {AdminSupportComponent} from './admin/admin-support/admin-support.component';
import {AdminSupportDetailsComponent} from './admin/admin-support-details/admin-support-details.component';
import {TutorComponent} from './tutor/tutor.component';
import {TutorDashboardComponent} from './tutor/tutor-dashboard/tutor-dashboard.component';
import {TutorAuthComponent} from './tutor/tutor-auth/tutor-auth.component';
import {TutorComponentComponent} from './tutor/tutor-component/tutor-component.component';
import {TutorFooterComponent} from './tutor/tutor-component/tutor-footer/tutor-footer.component';
import {TutorNavbarComponent} from './tutor/tutor-component/tutor-navbar/tutor-navbar.component';
import {TutorSidebarComponent} from './tutor/tutor-component/tutor-sidebar/tutor-sidebar.component';
import {TutorCoursesComponent} from './tutor/tutor-courses/tutor-courses.component';
import {TutorCourseDetailsComponent} from './tutor/tutor-course-details/tutor-course-details.component';
import {TutorCourseModuleDetailsComponent} from './tutor/tutor-course-module-details/tutor-course-module-details.component';
import {TutorSupportComponent} from './tutor/tutor-support/tutor-support.component';

import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { LandingNavbarComponent } from './landing/landing-navbar/landing-navbar.component';
import { LandingFooterbarComponent } from './landing/landing-footerbar/landing-footerbar.component';
import { LandingCoursesComponent } from './landing/landing-courses/landing-courses.component';
import { LandingCourseDetailsComponent } from './landing/landing-course-details/landing-course-details.component';
import { LandingSearchComponent } from './landing/landing-search/landing-search.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';
import { NavBarComponent } from './student/component/nav-bar/nav-bar.component';
import { HeaderComponent } from './student/component/header/header.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    FourofourComponent,
    NotificationComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminAuthComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminCoursesComponent,
    AdminCreateCourseComponent,
    AlertNotificationComponent,
    AdminCourseDetailsComponent,
    AdminCourseEditComponent,
    AdminCreateCoursePathComponent,
    AdminCreateCourseEnrollStudentComponent,
    AdminCoursePathDetailsComponent,
    AdminCoursePathEditComponent,
    AdminTutorsComponent,
    AdminCreateTutorComponent,
    AdminTutorDetailsComponent,
    PreviewServiceComponent,
    AdminEditTutorDetailsComponent,
    AssignStaffComponent,
    AdminStudentsComponent,
    AdminStudentDetailsComponent,
    AdminEditStudentComponent,
    AdminCreateStudentComponent,
    AdminEnrollStudentComponent,
    AdminEarnComponent,
    AdminSupportComponent,
    AdminSupportDetailsComponent,
    TutorComponent,
    TutorDashboardComponent,
    TutorAuthComponent,
    TutorComponentComponent,
    TutorFooterComponent,
    TutorNavbarComponent,
    TutorSidebarComponent,
    TutorCoursesComponent,
    TutorCourseDetailsComponent,
    TutorCourseModuleDetailsComponent,
    TutorSupportComponent,
    LandingNavbarComponent,
    LandingFooterbarComponent,
    LandingCoursesComponent,
    LandingCourseDetailsComponent,
    LandingSearchComponent,
    MyCoursesComponent,
    NavBarComponent,
    HeaderComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CKEditorModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [AuthService, DataService, UiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
