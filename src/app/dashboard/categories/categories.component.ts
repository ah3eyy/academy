import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  top;

  offSetHeight;

  scrollHeight;

  loading = false;

  success = false;

  network = false;

  data: any;

  loadMore = false;

  nextPage = 0;

  retryLoadMore = false;

  constructor(private httpclient: HttpClient) { }

  ngOnInit() {

    this.loading = true;

    this.success = false;

    this.network = false;

    this.load();

  }

  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/course-categories`).subscribe(

      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          this.nextPage = (data.data.course.current_page < data.data.course.last_page) ? data.data.course.current_page + 1 : 0;

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

  onLoadMore() {

    this.loadMore = true;

    this.httpclient.get<any>(`${environment.api_url}v1/course-categories?page=${this.nextPage}`).subscribe(

      data => {

        this.loadMore = false;

        if (data.code == 1) {

          this.data = data.data;

          this.nextPage = (data.data.course.current_page < data.data.course.last_page) ? data.data.course.current_page + 1 : 0;

          return true;
        }

        this.retryLoadMore = true;

      },

      error => {

        this.loadMore = false;

        this.retryLoadMore = true;

      }

    );


  }

  onReload() {
    this.ngOnInit();
  }


  // customOptions: OwlOptions = {
  //   items: 10,
  //   loop: false,
  //   margin: 20,
  //   nav: true,
  //   dots: false,
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
