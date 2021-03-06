import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-landing-search',
  templateUrl: './landing-search.component.html',
  styleUrls: ['./landing-search.component.scss']
})
export class LandingSearchComponent implements OnInit {

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
