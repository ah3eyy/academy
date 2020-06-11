import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) {
  }

  ngOnInit() {
  }


  onLogOut() {
    this.auth.logout();
    this.route.navigate(['/']);
  }
}
