import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TutorService {


  url = environment.api_url + 'tutor/';

  constructor(private httpClient: HttpClient) {
  }

  fetchCourses(page = 1) {
    return this.httpClient.get(`${this.url}fetch-all-course?page=${page}`);
  }

  fetchCourseDetails(course_id, page = 1) {
    return this.httpClient.get(`${this.url}fetch-course-details/${course_id}?page=${page}`);
  }

  fetchCourseModuleDetails(course_module_id, page = 1) {
    return this.httpClient.get(`${this.url}fetch-course-module-details/${course_module_id}?page=${page}`);
  }

  fetchSupport(page = 1) {
    return this.httpClient.get(`${this.url}fetch-support?page=${page}`);
  }

  fetchConversation(page = 1, supportId) {
    return this.httpClient.get(`${this.url}fetch-conversation/${supportId}?page=${page}`);
  }

  sendMessage(data){
    return this.httpClient.post(`${this.url}send-message`, data);
  }

}
