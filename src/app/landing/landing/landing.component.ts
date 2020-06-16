import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  submitted = false;

  loading = false;

  message;

  network = false;

  courses;

  success;

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse() {

    this.http.get(`${environment.api_url}home/fetch-courses`).subscribe(
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
}
