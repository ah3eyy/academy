import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  externalLink = environment.api_url_link;

  data: any;

  constructor(private httpclient: HttpClient) {
  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.load();

  }

  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/fetch-user-course`).subscribe(
      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          return true;
        }

        this.network = true;

      },

      error => {

        this.loading = false;

        this.network = true;

      }
    );

  }


  onReload() {
    this.ngOnInit();
  }


}
