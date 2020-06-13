import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AdminServicesService} from '../../auth/admin-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-create-tutor',
  templateUrl: './admin-create-tutor.component.html',
  styleUrls: ['./admin-create-tutor.component.scss']
})
export class AdminCreateTutorComponent implements OnInit {

  public editorValue: string = '';

  tutor: FormGroup;

  submitted = false;

  loading = false;

  messages: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cdf: ChangeDetectorRef,
    private adminService: AdminServicesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.tutorInit();
  }

  tutorInit() {
    this.tutor = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }


  get f() {
    return this.tutor.controls;
  }

  onCreateTutor() {
    try {

      this.submitted = true;

      if (this.tutor.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.createTutor(this.tutor.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Tutor created successfully'
            };

            this.router.navigate([`admin/tutor-details/${success.data.tutor.id}`]);

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
