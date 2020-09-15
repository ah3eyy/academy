import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

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
