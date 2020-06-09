import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';


@Component({
  selector: 'app-admin-course-edit',
  templateUrl: './admin-course-edit.component.html',
  styleUrls: ['./admin-course-edit.component.scss']
})
export class AdminCourseEditComponent implements OnInit {

  public editorValue: string = '';

  course: FormGroup;

  submitted = false;

  loading = false;

  messages: any;

  loadDetail = false;

  success = false;

  network = false;

  course_id;

  details;

  counter;

  external_link = environment.api_url_link;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cdf: ChangeDetectorRef,
    private adminService: AdminServicesService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.course_id = activateRoute.params['value'].course_id;
  }

  ngOnInit() {
    this.courseInit();
    this.load();
  }

  courseInit() {
    this.course = this.formBuilder.group({
      course_name: ['', [Validators.required]],
      enroll_amount: ['', [Validators.required]],
      cover_image: [''],
      course_category: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  load(page = 1) {

    try {

      this.adminService.fetchCourseDetails(this.course_id, page).subscribe(
        (res: any) => {

          this.loading = false;

          if (res.code == 1) {

            this.success = true;

            this.details = res.data;

            this.course.patchValue({
              course_name: this.details.course.course_name,
              enroll_amount: this.details.course.amount,
              course_category: this.details.course.category,
              description: this.details.course.description
            });

            return;
          }

          this.network = true;

        },

        error => {
          this.network = true;
          this.loadDetail = false;
        }
      );


    } catch (e) {
      this.network = true;

      this.loadDetail = false;
    }

  }


  imageUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.course.patchValue({
      cover_image: file
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

  updateCourse() {


    try {

      this.submitted = true;

      if (this.course.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.updateCourse(this.course.value, this.course_id).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Course created successfully'
            };

            this.router.navigate([`admin/course-details/${success.data.course.id}`]);

            return true;
          }

          this.messages = {
            'type': 'danger',
            'show': 'show',
            'message': 'An error occurred updating course.'
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
