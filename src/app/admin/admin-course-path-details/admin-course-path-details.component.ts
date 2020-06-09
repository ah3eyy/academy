import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-admin-course-path-details',
  templateUrl: './admin-course-path-details.component.html',
  styleUrls: ['./admin-course-path-details.component.scss']
})
export class AdminCoursePathDetailsComponent implements OnInit {

  external_url = environment.api_url_link;

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

  load() {

    try {

      this.adminService.fetchCoursePathDetails(this.course_id).subscribe(
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

  onReload() {
    this.ngOnInit();
  }

}
