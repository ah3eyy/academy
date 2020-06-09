import {Component, OnInit} from '@angular/core';
import {AdminServicesService} from '../../auth/admin-services.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit {
  loading = false;

  network = false;

  success = false;

  student: any;

  counter: any;

  constructor(private adminService: AdminServicesService) {
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getStudent();
  }

  getStudent(page = 1) {
    try {
      this.adminService.fetchStudent(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.student = success.data;

            const count = (this.student.user.last_page > 5) ? 5 : this.student.user.last_page;

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

    if (this.student.current_page > 1) {

      this.getStudent(this.student.user.current_page - 1);

    }
  }

  onNext() {

    if (this.student.current_page < this.student.last_page) {

      this.getStudent(this.student.user.current_page + 1);

    }


  }

  onReload() {
    this.ngOnInit();
  }
}
