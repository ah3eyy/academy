import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {VgAPI} from 'videogular2/compiled/src/core/services/vg-api';

;

@Component({
  selector: 'app-course-module-info',
  templateUrl: './course-module-info.component.html',
  styleUrls: ['./course-module-info.component.scss']
})
export class CourseModuleInfoComponent implements OnInit {

  @ViewChild('media', {static: false}) media: ElementRef;

  preload: string = 'auto';

  api: VgAPI;

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

  moduleId;

  currentCourse: any;

  viewModule = [];

  active_video;

  constructor(private httpClient: HttpClient, private activeRouter: ActivatedRoute, private route: Router,
              private cdf: ChangeDetectorRef) {
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

    this.httpClient.get<any>(`${environment.api_url}v1/course/${this.getParam}/${this.moduleId}`).subscribe(
      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          this.data = data.data;

          if (this.data.user_course_status.current_module) {

            let active = 0;

            // covert lists of viewed modules by user
            this.viewModule = this.data.user_course_status.current_module.split(',');

            for (let i = 0; i < this.viewModule.length; i++) {

              let activeSplit = this.viewModule[i].split(':');

              if (activeSplit[1] == 'active') {
                active = activeSplit[0];
                // return;
              }

            }

            for (let i = 0; i < this.data.course_module.length; i++) {

              if (this.data.course_module[i].id == active) {
                this.currentCourse = this.data.course_module[i];
                this.active_video = environment.api_url_link + this.currentCourse.video_url;
                return;
              }
            }


            if (!this.currentCourse) {
              this.currentCourse = this.data.course_module[0];

              this.active_video = environment.api_url_link + this.currentCourse.video_url;

              this.updateActiveCourse();
            }

          } else {

            this.currentCourse = this.data.course_module[0];
            this.active_video = environment.api_url_link + this.currentCourse.video_url;

            this.updateActiveCourse();

          }

          console.log(this.active_video);

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

  onPlayerReady(event: VgAPI) {

    this.api = event;

    this.api.play();
  }

  updateActiveCourse() {

    this.httpClient.post<any>(`${environment.api_url}v1/update-course`, {
      course_id: this.getParam,
      module_id: this.currentCourse.id
    }).subscribe(
      data => {

        if (data.code == 1) {


          return;
        }

      },

      error => {


      }
    );

  }

  onSelectCourseModule(index) {

    this.api.pause();

    this.currentCourse = this.data.course_module[index];

    this.active_video = environment.api_url_link + this.currentCourse.video_url;
    this.media['src'] = this.active_video;
    this.cdf.detectChanges();

    this.updateActiveCourse();

    this.api.play();

  }

  onReload() {
    this.ngOnInit();
  }

}
