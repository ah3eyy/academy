import {Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assign-staff',
  templateUrl: './assign-staff.component.html',
  styleUrls: ['./assign-staff.component.scss']
})
export class AssignStaffComponent implements OnInit {

  loading = false;

  success = false;

  network = false;

  getId;

  type;

  details: any;

  messages: any;

  dropDown = [{name: 'Support', key: 'support'}, {name: 'tutor', key: 'Tutor'}];

  counter;

  data;

  query = {designation: '', uid: '', course_id: ''};

  constructor(
    private adminServicesService: AdminServicesService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.getId = activatedRoute.params['value'].id;

    this.type = activatedRoute.params['value'].type;
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.fetchAssignDetails();

  }


  fetchAssignDetails(page = 1) {

    let data = {
      id: this.getId,
      page: page,
      type: this.type
    };

    this.adminServicesService.fetchAssignDetails(data).subscribe(
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

    if (this.type == 'tutor') {
      data = {course_id: id, tutor_id: this.getId, designation: this.query.designation};
    }


    if (this.type == 'course') {
      data = {course_id: this.getId, tutor_id: id, designation: this.query.designation};
    }


    if (this.query.designation == '') {
      this.messages = {show: 'show', type: 'danger', message: 'Designation is required'};
      return;
    }

    this.messages = {show: 'show', 'type': 'info', message: 'Please wait!! '};

    this.adminServicesService.assignTutor(data).subscribe(
      (success: any) => {

        if (success.code == 1) {

          this.messages = {show: 'show', type: 'success', message: 'Tutor assigned successfully'};

          this.ngOnInit();

          return;
        }
        this.messages = {show: 'show', type: 'danger', message: 'Error occurred assigning tutor'};
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

      this.fetchAssignDetails(this.details.current_page - 1);

    }
  }

  onNext() {

    if (this.details.current_page < this.details.last_page) {

      this.fetchAssignDetails(this.details.current_page + 1);

    }


  }


  onReload() {
    this.ngOnInit();
  }

}
