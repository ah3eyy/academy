import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AdminServicesService} from '../../auth/admin-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-create-student',
  templateUrl: './admin-create-student.component.html',
  styleUrls: ['./admin-create-student.component.scss']
})
export class AdminCreateStudentComponent implements OnInit {

  loading = false;

  submitted = false;

  messages: any;

  student : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cdf: ChangeDetectorRef,
    private adminService: AdminServicesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.studentInit();
  }

  studentInit() {
    this.student = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }


  get f() {
    return this.student.controls;
  }

  onCreateStudent() {
    try {

      this.submitted = true;

      if (this.student.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.createStudent(this.student.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Student created successfully'
            };

            this.router.navigate([`admin/student-details/${success.data.student_id}`]);

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

          this.loading = false;

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
