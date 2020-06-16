import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private cdf: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
    this.getCourseId = activatedRoute.params['value'].id;
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse() {

    this.http.get(`${environment.api_url}home/fetch-course-details/${this.getCourseId}`).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {
          this.success = true;
          this.courses = res.data;
          console.log(this.courses);
          return;
        }

        this.network = true;

      },
      (error) => {

        this.loading = false;

        this.network = true;

      }
    );

  }

  onReload() {
    this.ngOnInit();
  }
}
