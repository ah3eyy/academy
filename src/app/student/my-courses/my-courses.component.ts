import {Component, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  network = false;
  success = false;
  loading = false;

  details: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;

    this.fetchMyCourses();
  }

  fetchMyCourses() {
    this.userService.userCourses().subscribe(
      (response: any) => {
        this.details = response.data.user_courses;

        this.loading = false;
        this.success = true;

      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  reload() {
    this.ngOnInit();
  }
}
