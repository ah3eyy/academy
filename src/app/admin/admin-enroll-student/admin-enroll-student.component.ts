import {Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-enroll-student',
  templateUrl: './admin-enroll-student.component.html',
  styleUrls: ['./admin-enroll-student.component.scss']
})
export class AdminEnrollStudentComponent implements OnInit {

  loading = false;

  success = false;

  network = false;

  getId;

  type;

  details: any;

  messages: any;

  counter;

  data;

  query = {designation: '', uid: '', course_id: ''};

  constructor(
    private adminServicesService: AdminServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.getId = activatedRoute.params['value'].studentId;

    this.type = activatedRoute.params['value'].type;
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.fetchEnrollDetails();

  }

  fetchEnrollDetails(page = 1) {

    let data = {
      id: this.getId,
      page: page,
      type: this.type
    };

    this.adminServicesService.fetchEnrollDetails(data).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {

          this.success = true;

          this.details = res.data;

          const count = (this.details.last_page > 5) ? 5 : this.details.last_page;

          this.counter = Array.from({length: count}, (v, k) => k + 1);

          return;
        }

        this.network = true;

      },
      (error) => {

        this.loading = false;

        this.network = false;

      }
    );

  }

  onAssign(id) {

    let data = {};

    if (this.type == 'student') {
      data = {course_id: id, student_id: this.getId};
    }


    if (this.type == 'course') {
      data = {course_id: this.getId, student_id: id};
    }

    this.messages = {show: 'show', 'type': 'info', message: 'Please wait!! '};

    this.adminServicesService.enrollStudent(data).subscribe(
      (success: any) => {

        if (success.code == 1) {

          this.messages = {show: 'show', type: 'success', message: 'Student enroll successfully'};

          this.router.navigate([`admin/student-details/${this.getId}`]);

          return;
        }

        this.messages = {show: 'show', type: 'danger', message: 'Error occurred enrolling student'};

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

  onPrevious() {

    if (this.details.current_page > 1) {

      this.fetchEnrollDetails(this.details.current_page - 1);

    }
  }

  onNext() {

    if (this.details.current_page < this.details.last_page) {

      this.fetchEnrollDetails(this.details.current_page + 1);

    }

  }

  onReload() {
    this.ngOnInit();
  }

}
