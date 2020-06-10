import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute} from '@angular/router';
import {TutorService} from '../../auth/tutor.service';

@Component({
  selector: 'app-tutor-support',
  templateUrl: './tutor-support.component.html',
  styleUrls: ['./tutor-support.component.scss']
})
export class TutorSupportComponent implements OnInit {
  loading = false;

  network = false;

  success = false;

  support: any;

  counter: any;

  supportId = '';

  external_url = environment.api_url_link;

  active;

  constructor(private tutorService: TutorService, private activetedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getSupportDetails();
  }

  getSupportDetails(page = 1) {
    try {
      this.tutorService.fetchSupport(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.support = success.data;

            // this.active = this.support.support.data[0].id;

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

  }

  onNext() {
  }

  onReload() {
    this.ngOnInit();
  }

}
