import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss']
})
export class LandingNavbarComponent implements OnInit, OnChanges {
  @Input() headerType;
  @Input() otherDetails;

  is_login = false;

  user_details;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    console.log(this.authService.isAuthenticate());
    if (this.authService.isAuthenticate()) {
      this.is_login = true;
      this.user_details = this.authService.getUser();
    } else {
      this.is_login = false;
    }
  }


  ngOnChanges(): void {

  }


  onLogOut() {
    this.authService.logout();

    this.ngOnInit();
  }

}
