import {Component, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss']
})
export class LiveSessionsComponent implements OnInit {

  network = false;
  success = false;
  loading = false;

  details: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;

    this.fetchLiveSessions();
  }

  fetchLiveSessions() {
    this.userService.liveSession().subscribe(
      (response: any) => {
        this.details = response.data;

        this.loading = false;
        this.success = true;

      },
      (error) => {
        this.loading = false;
        this.network = true;
      }
    );
  }

  reload() {
    this.ngOnInit();
  }

}
