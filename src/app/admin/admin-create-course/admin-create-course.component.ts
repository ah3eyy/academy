import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AdminServicesService} from '../../auth/admin-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-create-course',
  templateUrl: './admin-create-course.component.html',
  styleUrls: ['./admin-create-course.component.scss']
})
export class AdminCreateCourseComponent implements OnInit {

  public editorValue: string = '';

  course: FormGroup;

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
    this.courseInit();
  }

  courseInit() {
    this.course = this.formBuilder.group({
      course_name: ['', [Validators.required]],
      enroll_amount: ['', [Validators.required]],
      cover_image: ['', [Validators.required]],
      course_category: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
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

  createCourse() {

    try {

      this.submitted = true;

      if (this.course.invalid) {
        return;
      }

      this.loading = true;

      this.adminService.createCourse(this.course.value).subscribe(
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
