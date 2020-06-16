import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-landing-courses',
  templateUrl: './landing-courses.component.html',
  styleUrls: ['./landing-courses.component.scss']
})
export class LandingCoursesComponent implements OnInit {

  submitted = false;

  loading = false;

  message;

  network = false;

  courses;

  success;

  loadMore = false;

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse() {

    this.http.get(`${environment.api_url}home/fetch-all-courses`).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {
          this.success = true;
          this.courses = res.data;
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

  loadCourse(page) {

    this.http.get(`${environment.api_url}home/fetch-all-courses?page=${page}`).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {
          this.success = true;

          if (res.data.course.data.length > 0) {
            res.data.course.data.map((e) => {
              this.courses.course.data.push(e);
            });
          }

          this.courses.course.last_page = res.data.course.last_page;

          this.courses.course.current_page = res.data.course.current_page;

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

  onLoadMore() {

    if (this.courses.course.current_page < this.courses.course.last_page && (this.courses.course.current_page + 1) <= this.courses.course.last_page) {

      this.loadCourse(this.courses.course.current_page + 1);

    }

  }

}
