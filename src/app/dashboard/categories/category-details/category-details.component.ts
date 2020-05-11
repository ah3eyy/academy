import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  loading = false;

  network = false;

  success = false;

  loadMore = false;

  retryLoadMore = false;

  getParam;

  data: any;

  constructor(private httpclient: HttpClient, private activeRouter: ActivatedRoute, private route: Router) {

    this.getParam = this.activeRouter.params['value'].courseid;

  }

  ngOnInit() {

    this.loading = true;

    this.network = false;

    this.success = false;

    this.loadMore = false;

    this.retryLoadMore = false;

    this.load();

  }


  load() {

    this.httpclient.get<any>(`${environment.api_url}v1/course-categories/${this.getParam}`).subscribe(

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

        this.network = true;

        this.loading = false;

      }

    );

  }


  onReload() {
    this.ngOnInit();
  }

}
