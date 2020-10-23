import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicService} from '../../auth/public.service';
import {AuthService} from '../../auth/auth.service';

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

  userDetails;

  userPaid = false;

  @ViewChild('makePaymentBtn', {static: false}) makePaymentBtn: ElementRef;

  constructor(private http: HttpClient,
              public publicService: PublicService,
              private formbuilder: FormBuilder,
              private cdf: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              public router: Router
  ) {
    this.getCourseId = activatedRoute.params['value'].id;
  }

  async ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.userDetails = this.authService.getUser();
    this.fetchCourse();
  }

  fetchCourse() {
    this.publicService.courseDetail({slug: this.getCourseId, uid: this.userDetails.uid}).subscribe(
      (response: any) => {
        this.success = true;
        this.loading = false;
        this.courses = response.data;
        this.network = false;

        if (this.courses.user_course) {
          this.userPaid = true;
        }
        console.log(this.courses.classes);
      },
      (error) => {
        this.network = true;

        this.loading = false;
      }
    );
  }

  async onReload() {
    await this.ngOnInit();
  }

}
