import {Component, OnInit} from '@angular/core';
import {TutorService} from '../../auth/tutor.service';

@Component({
  selector: 'app-tutor-courses',
  templateUrl: './tutor-courses.component.html',
  styleUrls: ['./tutor-courses.component.scss']
})
export class TutorCoursesComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  courses: any;

  counter: any;

  constructor(private tutorService: TutorService) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getCourses();
  }

  getCourses(page = 1) {
    try {
      this.tutorService.fetchCourses(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.courses = success.data;

            const count = (this.counter > 5) ? 5 : this.courses.course.last_page;

            this.counter = Array.from({length: count}, (v, k) => k + 1);

            return;
          }

          this.network = false;

        },
        error => {

          this.loading = false;

          this.network = true;

        }
      );
    } catch (e) {
      this.loading = false;

      this.network = true;
    }
  }

  onPrevious() {

    if (this.courses.course.current_page > 1) {

      this.getCourses(this.courses.course.current_page - 1);

    }
  }

  onNext() {

    if (this.courses.course.current_page < this.courses.course.last_page) {

      this.getCourses(this.courses.course.current_page + 1);

    }


  }

  onReload() {
    this.ngOnInit();
  }
}
