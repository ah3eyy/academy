import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { FooterComponent } from './navigation/footer/footer.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { ScrollBottomDirective } from './scroll-bottom.directive';
import { CourseInfoComponent } from './course-info/course-info.component';
// import { RatingModule } from 'ng-starrating';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, AccountComponent, NavbarComponent, SidebarComponent, FooterComponent, CategoriesComponent, CategoryDetailsComponent, ScrollBottomDirective, CourseInfoComponent, EnrollNowComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // CarouselModule,
    // RatingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
