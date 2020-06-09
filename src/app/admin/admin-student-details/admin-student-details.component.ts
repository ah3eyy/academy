import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';

@Component({
  selector: 'app-admin-student-details',
  templateUrl: './admin-student-details.component.html',
  styleUrls: ['./admin-student-details.component.scss']
})
export class AdminStudentDetailsComponent implements OnInit {

  loading = false;

  success = false;

  network = false;

  student_id;

  details;

  counter;

  messages;

  constructor(
    private httpClient: HttpClient,
    private activateRoute: ActivatedRoute,
    private adminService: AdminServicesService
  ) {
    this.student_id = activateRoute.params['value'].studentId;
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.loadDetails();

  }

  loadDetails(page = 1) {

    this.adminService.fetchStudentDetails(this.student_id, page).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {

          this.success = true;

          this.details = res.data;

          const count = (this.counter > 5) ? 5 : this.details.student_course.last_page;

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

  }

  onPrevious() {
    if (this.details.student_course.current_page > 1) {

      this.loadDetails(this.details.student_course.current_page - 1);

    }
  }

  onNext() {

    if (this.details.student_course.current_page < this.details.student_course.last_page) {

      this.loadDetails(this.details.student_course.current_page + 1);

    }

  }

  onReload() {
    this.ngOnInit();
  }

  unEnroll(id) {

    this.messages = {show: 'show', 'type': 'info', message: 'Please wait!! '};

    this.adminService.unEnrollStudent({assign_id: id}).subscribe(
      (success: any) => {

        if (success.code == 1) {

          this.messages = {show: 'show', type: 'success', message: 'Student un-enrolled successfully'};

          this.ngOnInit();

          return;
        }
        this.messages = {show: 'show', type: 'danger', message: 'Error occurred performing action'};
      },
      (error) => {

        this.messages = {
          show: 'show',
          type: 'danger',
          message: (error.error.short_description) ? error.error.short_description : 'Check internet connection'
        };

      }
    );

  }

}
