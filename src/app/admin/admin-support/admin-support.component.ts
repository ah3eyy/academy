import { Component, OnInit } from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.scss']
})
export class AdminSupportComponent implements OnInit {
  loading = false;

  network = false;

  success = false;

  support: any;

  counter: any;

  constructor(private adminService: AdminServicesService) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getSupport();
  }

  getSupport(page = 1) {
    try {
      this.adminService.fetchSupport(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.support = success.data;

            const count = (this.support.support.last_page > 5) ? 5 : this.support.support.last_page;

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

    if (this.support.current_page > 1) {

      this.getSupport(this.support.support.current_page - 1);

    }
  }

  onNext() {

    if (this.support.current_page < this.support.last_page) {

      this.getSupport(this.support.support.current_page + 1);

    }


  }

  onReload() {
    this.ngOnInit();
  }
}
