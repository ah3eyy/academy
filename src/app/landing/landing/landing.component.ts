import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PublicService} from '../../auth/public.service';

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


  constructor(private http: HttpClient, private cdf: ChangeDetectorRef, private publicService: PublicService) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.fetchCourse();
  }

  fetchCourse() {
    this.publicService.courses().subscribe(
      (response: any) => {
        this.success = true;
        this.loading = false;
        this.courses = response.data.courses;
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
