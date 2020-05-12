import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  data: any;

  constructor(private httpclient: HttpClient) { }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.load();

  }

  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/user-dashboard`).subscribe(

      data => {

        console.log(data);
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


  // customOptions: OwlOptions = {
  //   items:10,
  //   loop:false,
  //   margin:20,
  //   nav:true,
  //   dots:false,
  //   navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     600: {
  //       items: 2
  //     },
  //     1000: {
  //       items: 3
  //     },
  //     1200: {
  //       items: 4
  //     },
  //     1400: {
  //       items: 4
  //     }
  //   }
  // }

}
