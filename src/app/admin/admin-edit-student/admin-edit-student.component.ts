import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-edit-student',
  templateUrl: './admin-edit-student.component.html',
  styleUrls: ['./admin-edit-student.component.scss']
})
export class AdminEditStudentComponent implements OnInit {
  loading = false;

  loadEdit = false;

  success = false;

  network = false;

  student_id;

  submitted = false;

  details;

  student: FormGroup;

  counter;

  messages;

  constructor(
    private httpClient: HttpClient,
    private activateRoute: ActivatedRoute,
    private adminService: AdminServicesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.student_id = activateRoute.params['value'].studentId;
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.studentInit();

    this.loadDetails();

  }

  loadDetails(page = 1) {

    this.adminService.fetchStudentDetails(this.student_id, page).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {

          this.success = true;

          this.details = res.data;

          let name = this.details.student.name.split(' ');

          this.student.patchValue({
            first_name: name[0],
            last_name: name[1],
            email: this.details.student.email,
            address: this.details.student.address,
            phone: this.details.student.phone
          });

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

  onReload() {
    this.ngOnInit();
  }


  studentInit() {
    this.student = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      uid: [this.student_id]
    });
  }


  get f() {
    return this.student.controls;
  }

  onUpdateStudent() {
    try {

      this.submitted = true;

      if (this.student.invalid) {
        return;
      }

      this.loadEdit = true;

      this.adminService.updateStudentDetails(this.student.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loadEdit = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Profile updated successfully'
            };

            this.router.navigate([`admin/student-details/${this.student_id}`]);

            this.ngOnInit();

            return true;
          }

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': 'An error occurred creating tutor.'
          };

        },
        error => {

          this.submitted = false;

          this.loadEdit = false;

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': (error.error.short_description) ? error.error.short_description : 'An error occurred. Check internet connection'
          };

        }
      );

    } catch (e) {
      this.messages = {'type': 'danger', 'show': 'show', 'message': 'An error occurred. Check internet connection.'};
    }
  }
}
