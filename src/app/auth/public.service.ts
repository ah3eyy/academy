import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  url = environment.api_url + '/api/v1/public/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  courses(page =1) {
    return this.httpClient.post(`${this.url}courses?page=${page}`, {});
  }

  courseDetail(data) {
    return this.httpClient.post(`${this.url}course-details`, data);
  }
}
