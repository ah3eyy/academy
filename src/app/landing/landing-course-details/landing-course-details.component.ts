import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../../auth/public.service';

@Component({
  selector: 'app-landing-course-details',
  templateUrl: './landing-course-details.component.html',
  styleUrls: ['./landing-course-details.component.scss']
})
export class LandingCourseDetailsComponent implements OnInit {

  submitted = false;

  loading = false;

  message;

  network = false;

  courses;

  success;

  getCourseId;

  constructor(private http: HttpClient,
              public publicService:PublicService,
              private formbuilder: FormBuilder,
              private cdf: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute
  ) {
    this.getCourseId = activatedRoute.params['value'].id;
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse() {
    this.publicService.courseDetail({slug: this.getCourseId}).subscribe(
      (response: any) => {
        this.success = true;
        this.loading = false;
        this.courses = response.data;
        this.network = false;
        console.log(this.courses.classes)
      },
      (error) => {
        this.network = true;

        this.loading = false;
      }
    );
  }

  onReload() {
    this.ngOnInit();
  }
}
