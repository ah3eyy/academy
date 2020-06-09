import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-edit-tutor-details',
  templateUrl: './admin-edit-tutor-details.component.html',
  styleUrls: ['./admin-edit-tutor-details.component.scss']
})
export class AdminEditTutorDetailsComponent implements OnInit {
  tutor: FormGroup;

  submitted = false;

  loading = false;

  messages: any;

  editLoading = false;

  success = false;

  network = false;

  tutor_id;

  details;

  constructor(
    private httpClient: HttpClient,
    private activateRoute: ActivatedRoute,
    private adminService: AdminServicesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.tutor_id = activateRoute.params['value'].id;
  }

  ngOnInit() {
    this.loading = true;

    this.network = false;

    this.success = false;

    this.tutorInit();

    this.loadDetails();
  }

  tutorInit() {
    this.tutor = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      tutor_id: ['']
    });
  }

  loadDetails(page = 1) {
    this.adminService.fetchTutorDetails(this.tutor_id, page).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {

          this.success = true;

          this.details = res.data;

          this.tutor.patchValue({
            name: this.details.tutor.name,
            email: this.details.tutor.email,
            user_name: this.details.tutor.username,
            phone: this.details.tutor.phone,
            tutor_id: this.details.tutor.id
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

  get f() {
    return this.tutor.controls;
  }

  onUpdateTutor() {
    try {

      this.submitted = true;

      if (this.tutor.invalid) {
        return;
      }

      this.editLoading = true;

      this.adminService.updateTutor(this.tutor.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.editLoading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Tutor update successfully'
            };

            this.router.navigate([`admin/tutor-details/${this.tutor_id}`]);

            return true;
          }

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': 'An error occurred updating tutor.'
          };

        },
        error => {

          this.submitted = false;

          this.editLoading = false;

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': (error.error.short_description) ? error.error.short_description : 'An error occurred. Check internet connection'
          };

        }
      );

    } catch (e) {
      this.editLoading = false;
      this.messages = {'type': 'danger', 'show': 'show', 'message': 'An error occurred. Check internet connection.'};
    }
  }
}
