import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {NavbarComponent} from './navigation/navbar/navbar.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {FooterComponent} from './navigation/footer/footer.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryDetailsComponent} from './categories/category-details/category-details.component';
import {ScrollBottomDirective} from './scroll-bottom.directive';
import {CourseInfoComponent} from './course-info/course-info.component';
// import { RatingModule } from 'ng-starrating';
import {EnrollNowComponent} from './enroll-now/enroll-now.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CourseModuleInfoComponent} from './course-module-info/course-module-info.component';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import {VgStreamingModule} from 'videogular2/compiled/src/streaming/streaming';
import { SupportComponent } from './support/support.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, AccountComponent, NavbarComponent, SidebarComponent, FooterComponent, CategoriesComponent, CategoryDetailsComponent, ScrollBottomDirective, CourseInfoComponent, EnrollNowComponent, CourseModuleInfoComponent, SupportComponent, PaymentHistoryComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // CarouselModule,
    // RatingModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
  ]
})
export class DashboardModule {
}
