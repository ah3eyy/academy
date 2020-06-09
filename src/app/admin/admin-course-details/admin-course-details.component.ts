import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrls: ['./admin-course-details.component.scss']
})
export class AdminCourseDetailsComponent implements OnInit {

  loading = false;

  success = false;

  network = false;

  course_id;

  details;

  counter;

  constructor(
    private httpClient: HttpClient,
    private activateRoute: ActivatedRoute,
    private adminService: AdminServicesService
  ) {

    this.course_id = activateRoute.params['value'].course_id;

  }

  ngOnInit() {
    this.loading = true;
    this.success = false;
    this.network = false;
    this.load()
  }

  load(page = 1) {

    try {

      this.adminService.fetchCourseDetails(this.course_id, page).subscribe(
        (res: any) => {

          this.loading = false;

          if (res.code == 1) {

            this.success = true;

            this.details = res.data;

            const count = (this.counter > 5) ? 5 : this.details.course_module.last_page;

            this.counter = Array.from({length: count}, (v, k) => k + 1);

            return;
          }

          this.network = true;

        },

        error => {
          this.network = true;
          this.loading = false;
        }
      );


    } catch (e) {
      this.network = true;

      this.loading = false;
    }

  }

  onPrevious() {
    if (this.details.course_module.current_page > 1) {

      this.load(this.details.course_module.current_page - 1);

    }
  }

  onNext() {

    if (this.details.course_module.current_page < this.details.course_module.last_page) {

      this.load(this.details.course_module.current_page + 1);

    }

  }

  onReload() {
    this.ngOnInit();
  }

}
