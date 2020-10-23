import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-landing-footerbar',
  templateUrl: './landing-footerbar.component.html',
  styleUrls: ['./landing-footerbar.component.scss']
})
export class LandingFooterbarComponent implements OnInit {

  is_login = false;

  user_details;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticate()) {
      this.is_login = true;
      this.user_details = this.authService.getUser();
    } else {
      this.is_login = false;
    }
  }


  onLogOut() {
    this.authService.logout();

    this.ngOnInit();
  }

}
