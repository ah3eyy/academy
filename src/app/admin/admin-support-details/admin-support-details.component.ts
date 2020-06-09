import {Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-admin-support-details',
  templateUrl: './admin-support-details.component.html',
  styleUrls: ['./admin-support-details.component.scss']
})
export class AdminSupportDetailsComponent implements OnInit {
  loading = false;

  network = false;

  success = false;

  support: any;

  counter: any;

  supportId = '';

  external_url = environment.api_url_link;

  constructor(private adminService: AdminServicesService, private activetedRoute: ActivatedRoute) {
    this.supportId = activetedRoute.params['value'].supportId;
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getSupportDetails();
  }

  getSupportDetails(page = 1) {
    try {
      this.adminService.fetchSupportDetails(page, this.supportId).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.support = success.data;

            const count = (this.support.conversation.last_page > 5) ? 5 : this.support.conversation.last_page;

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

    if (this.support.conversation.current_page > 1) {

      this.getSupportDetails(this.support.conversation.current_page - 1);

    }
  }

  onNext() {

    if (this.support.conversation.current_page < this.support.conversation.last_page) {

      this.getSupportDetails(this.support.conversation.current_page + 1);

    }


  }

  onReload() {
    this.ngOnInit();
  }

}
