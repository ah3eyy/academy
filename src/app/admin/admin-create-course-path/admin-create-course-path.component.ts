import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-create-course-path',
  templateUrl: './admin-create-course-path.component.html',
  styleUrls: ['./admin-create-course-path.component.scss']
})
export class AdminCreateCoursePathComponent implements OnInit {

  courseId;

  course: FormGroup;

  submitted = false;

  loading = false;

  messages: any;

  constructor(
    private adminService: AdminServicesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cdf: ChangeDetectorRef,
    private router: Router
  ) {

    this.courseId = activatedRoute.params['value'].course_id;

  }

  ngOnInit() {

    this.courseInit();

  }

  videoUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.course.patchValue({
      course_video: file,
      course_id: this.courseId
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
      course_video: ['', [Validators.required]],
      course_id: ['', [Validators.required]]
    });
  }

  createCoursePath() {


    try {

      this.submitted = true;

      if (this.course.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.createCoursePath(this.course.value).subscribe(
        (success: any) => {

          this.submitted = false;

          this.loading = false;

          if (success.code == 1) {

            this.messages = {
              'type': 'success',
              'show': 'show',
              'message': 'Course path created successfully'
            };

            this.router.navigate([`admin/course-details/${this.courseId}`]);

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

}
