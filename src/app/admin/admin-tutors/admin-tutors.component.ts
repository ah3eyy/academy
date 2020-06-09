import {Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';

@Component({
  selector: 'app-admin-tutors',
  templateUrl: './admin-tutors.component.html',
  styleUrls: ['./admin-tutors.component.scss']
})
export class AdminTutorsComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  tutors: any;

  counter: any;

  constructor(private adminService: AdminServicesService) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getTutor();
  }

  getTutor(page = 1) {
    try {
      this.adminService.fetchTutor(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.tutors = success.data;

            const count = (this.counter > 5) ? 5 : this.tutors.tutor.last_page;

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

    if (this.tutors.tutor.current_page > 1) {

      this.getTutor(this.tutors.tutor.current_page - 1);

    }
  }

  onNext() {

    if (this.tutors.tutors.current_page < this.tutors.tutor.last_page) {

      this.getTutor(this.tutors.tutor.current_page + 1);

    }


  }

  onReload() {
    this.ngOnInit();
  }

}
