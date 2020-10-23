import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {PublicService} from '../../auth/public.service';

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

  constructor(
    public  publicService: PublicService,
    private http: HttpClient, private formbuilder: FormBuilder, private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse(page = 1) {
    this.publicService.courses(page).subscribe(
      (res: any) => {
        this.success = true;
        this.loading = false;
        this.courses = res.data.courses;

        if (page > 1) {
          if (res.data.courses.data.length > 0) {
            res.data.courses.data.map((e) => {
              this.courses.data.push(e);
            });
          }
        }

        this.courses.last_page = res.data.courses.last_page;

        this.courses.current_page = res.data.courses.current_page;

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


  onLoadMore() {

    if (this.courses.current_page < this.courses.last_page && (this.courses.course.current_page + 1) <= this.courses.course.last_page) {
      this.loading = true;
      this.fetchCourse(this.courses.current_page + 1);

    }

  }

}
