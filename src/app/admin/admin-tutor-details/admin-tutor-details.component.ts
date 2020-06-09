import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AdminServicesService} from '../../auth/admin-services.service';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-admin-tutor-details',
  templateUrl: './admin-tutor-details.component.html',
  styleUrls: ['./admin-tutor-details.component.scss']
})
export class AdminTutorDetailsComponent implements OnInit {

  profileImage = false;

  photoId = false;

  loading = false;

  success = false;

  network = false;

  course_id;

  details;

  counter;

  messages;

  externalLink = environment.api_url_link;

  showImage;

  constructor(
    private httpClient: HttpClient,
    private activateRoute: ActivatedRoute,
    private adminService: AdminServicesService
  ) {
    this.course_id = activateRoute.params['value'].id;
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.loadDetails();

  }

  loadDetails(page = 1) {
    this.adminService.fetchTutorDetails(this.course_id, page).subscribe(
      (res: any) => {

        this.loading = false;

        if (res.code == 1) {

          this.success = true;

          this.details = res.data;

          const count = (this.counter > 5) ? 5 : this.details.tutor_course.last_page;

          this.counter = Array.from({length: count}, (v, k) => k + 1);

          return;
        }

        this.network = true;

      },

      error => {
        this.network = true;
        this.loading = false;
      }
    );

  }

  onPrevious() {
    if (this.details.tutor_course.current_page > 1) {

      this.loadDetails(this.details.tutor_course.current_page - 1);

    }
  }

  onNext() {

    if (this.details.tutor_course.current_page < this.details.tutor_course.last_page) {

      this.loadDetails(this.details.tutor_course.current_page + 1);

    }

  }

  onReload() {
    this.ngOnInit();
  }

  photoIdUpload(event) {

    try {
      this.photoId = true;

      const file = (event.target as HTMLInputElement).files[0];

      this.adminService.uploadPhotoId(file, this.course_id).subscribe(
        (res: any) => {

          this.photoId = false;

          if (res.code == 1) {

            this.messages = {'show': 'show', 'type': 'success', 'message': 'Photo Id uploaded successfully'};

            this.details.tutor = res.data.tutor;

            return true;
          }

          this.messages = {'show': 'show', 'type': 'danger', 'message': 'An error occurred uploading photo id'};

        },
        error => {

          this.photoId = false;

          this.messages = {
            'show': 'show',
            'type': 'danger',
            'message': (error.error.short_description) ? error.error.short_description : 'An error occurred uploading photo id'
          };

        }
      );
    } catch (e) {
      this.photoId = false;
      this.messages = {
        'show': 'show',
        'type': 'danger',
        'message': 'An error occurred. Check internet connectivity'
      };
    }

  }

  avaterUpload(event) {

    try {

      this.profileImage = true;

      const file = (event.target as HTMLInputElement).files[0];

      this.adminService.uploadProfileImage(file, this.course_id).subscribe(
        (res: any) => {

          this.profileImage = false;

          if (res.code == 1) {

            this.messages = {'show': 'show', 'type': 'success', 'message': 'Profile image uploaded successfully'};

            this.details.tutor = res.data.tutor;

            return true;
          }

          this.messages = {'show': 'show', 'type': 'danger', 'message': 'An error occurred uploading profile image'};

        },
        error => {

          this.profileImage = false;

          this.messages = {
            'show': 'show',
            'type': 'danger',
            'message': (error.error.short_description) ? error.error.short_description : 'An error occurred uploading profile image'
          };

        }
      );
    } catch (e) {
      this.profileImage = false;
      this.messages = {
        'show': 'show',
        'type': 'danger',
        'message': 'An error occurred. Check internet connectivity'
      };
    }

  }

  onPreviewImage(url) {
    this.showImage = {'show': 'show', 'image': url};
  }

  unAssign(id) {
    this.messages = {show: 'show', 'type': 'info', message: 'Please wait!! '};

    this.adminService.unAssignTutor({assign_id: id}).subscribe(
      (success: any) => {

        if (success.code == 1) {

          this.messages = {show: 'show', type: 'success', message: 'Tutor assigned successfully'};

          this.ngOnInit();

          return;
        }
        this.messages = {show: 'show', type: 'danger', message: 'Error occurred assigning tutor'};
      },
      (error) => {

        this.messages = {
          show: 'show',
          type: 'danger',
          message: (error.error.short_description) ? error.error.short_description : 'Check internet connection'
        };

      }
    );

  }

}
