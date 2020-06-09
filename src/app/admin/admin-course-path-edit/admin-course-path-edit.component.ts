import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-course-path-edit',
  templateUrl: './admin-course-path-edit.component.html',
  styleUrls: ['./admin-course-path-edit.component.scss']
})
export class AdminCoursePathEditComponent implements OnInit {

  course: FormGroup;

  submitted = false;

  messages: any;

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
    private adminService: AdminServicesService,
    private formBuilder: FormBuilder,
    private cdf: ChangeDetectorRef,
    private router : Router
  ) {

    this.course_id = activateRoute.params['value'].course_id;

  }

  ngOnInit() {
    this.loading = true;
    this.success = false;
    this.network = false;
    this.load();
    this.courseInit();
  }

  videoUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.course.patchValue({
      course_video: file,
      course_id: this.course_id
    });

    const files = event.srcElement.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
    };

    reader.readAsDataURL(files);

    this.cdf.detectChanges();
  }

  get f() {
    return this.course.controls;
  }

  courseInit() {
    this.course = this.formBuilder.group({
      course_name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      course_video: [''],
      course_id: ['', [Validators.required]]
    });
  }

  load() {

    try {

      this.adminService.fetchCoursePathDetails(this.course_id).subscribe(
        (res: any) => {

          this.loading = false;

          if (res.code == 1) {

            this.success = true;

            this.details = res.data;

            this.course.patchValue({
              course_name: this.details.course_module.name,
              duration: this.details.course_module.duration,
              course_id: this.course_id
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


    } catch (e) {
      this.network = true;

      this.loading = false;
    }

  }

  updateCoursePath(){

    try {

      this.submitted = true;

      if (this.course.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.updateCoursePath(this.course.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Course path updated successfully'
            };

            this.router.navigate([`admin/course-path-details/${this.course_id}`]);

            return true;
          }

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': 'An error occurred creating course.'
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

  onReload() {
    this.ngOnInit();
  }

}
