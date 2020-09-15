import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.api_url + '/api/v1/user/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  dashboard() {
    return this.httpClient.post(`${this.url}dashboard`, {});
  }

  courses() {
    return this.httpClient.post(`${this.url}courses`, {});
  }

  courseDetails(data) {
    return this.httpClient.post(`${this.url}course-details`, data);
  }

  profile() {
    return this.httpClient.post(`${this.url}profile`, {});
  }

  updateProfile(data) {
    return this.httpClient.post(`${this.url}update-profile`, data);
  }

  updatePassword(data) {
    return this.httpClient.post(`${this.url}update-password`, data);
  }

  userCourses() {
    return this.httpClient.post(`${this.url}user-courses`, {});
  }

  liveSession() {
    return this.httpClient.post(`${this.url}live-session`, {});
  }

  userCourseDetails(data) {
    return this.httpClient.post(`${this.url}user-course-details`, data);
  }

  confirmPayment(data) {
    return this.httpClient.post(`${this.url}confirm-payment`, data);
  }

  enrollFreeCourse(data) {
    return this.httpClient.post(`${this.url}enroll-free-course`, data);
  }
}
