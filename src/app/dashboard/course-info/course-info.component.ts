import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {VgMedia} from 'videogular2/compiled/src/core/vg-media/vg-media';

// import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  d: VgMedia

  loading = false;

  success = false;

  network = false;

  data: any;

  getParam;

  loadMore = false;

  retryLoadMore = false;

  nextPage = 1;

  moreView = false;

  loadMoreSuccess = true;

  external_link = environment.api_url_link;

  constructor(private httpClient: HttpClient, private activeRouter: ActivatedRoute, private route: Router) {
    this.getParam = this.activeRouter.params['value'].courseid;
  }

  ngOnInit() {
    this.loading = true;

    this.success = false;

    this.network = false;

    this.moreView = false;

    this.retryLoadMore = false;

    this.loadMore = false;

    this.load();

  }

  load() {

    this.httpClient.get<any>(`${environment.api_url}v1/course/${this.getParam}`).subscribe(
      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          this.nextPage = (this.data.reviews.current_page < this.data.reviews.last_page) ? this.nextPage + 1 : 1;

          this.moreView = (this.data.reviews.current_page < this.data.reviews.last_page) ? true : false;

          return;
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

    this.loadMoreSuccess = false;

    this.loadMore = true;

    this.httpClient.get<any>(`${environment.api_url}v1/course/${this.getParam}?page=${this.nextPage}`).subscribe(
      data => {

        this.loadMore = false;

        if (data.code == 1) {

          this.loadMoreSuccess = true;
          ;

          this.data.reviews.data = [...this.data.reviews.data, ...data.data.reviews.data];

          this.nextPage = (data.data.reviews.current_page < data.data.reviews.last_page) ? this.nextPage + 1 : 1;

          this.moreView = (data.data.reviews.current_page < data.data.reviews.last_page) ? true : false;

          return;
        }

        this.retryLoadMore = true;

      },

      error => {

        this.loadMore = false;

        this.retryLoadMore = true;

      }
    );

  }

  // onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {

  // }

  onReload() {
    this.ngOnInit();
  }

}
