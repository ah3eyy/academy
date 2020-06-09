import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TutorService} from '../../auth/tutor.service';

@Component({
  selector: 'app-tutor-course-module-details',
  templateUrl: './tutor-course-module-details.component.html',
  styleUrls: ['./tutor-course-module-details.component.scss']
})
export class TutorCourseModuleDetailsComponent implements OnInit {

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
    private tutorService: TutorService
  ) {

    this.course_id = activateRoute.params['value'].course_id;

  }

  ngOnInit() {
    this.loading = true;
    this.success = false;
    this.network = false;
    this.load();
  }

  load() {

    try {

      this.tutorService.fetchCourseModuleDetails(this.course_id).subscribe(
        (res: any) => {

          this.loading = false;

          if (res.code == 1) {

            this.success = true;

            this.details = res.data;

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

  onReload() {
    this.ngOnInit();
  }


}
