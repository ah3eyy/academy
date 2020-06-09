import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  url = environment.api_url + 'admin/';

  constructor(private httpClient: HttpClient) {
  }

  fetchCourses(page = 1) {
    return this.httpClient.get(`${this.url}fetch-all-course?page=${page}`);
  }

  createCourse(data) {
    let formData = new FormData();
    formData.append('course_name', data.course_name);
    formData.append('course_image', data.cover_image);
    formData.append('description', data.description);
    formData.append('course_category', data.course_category);
    formData.append('enroll_amount', data.enroll_amount);
    return this.httpClient.post(`${this.url}create-new-course`, formData);
  }

  fetchCourseDetails(course_id, page) {
    return this.httpClient.get(`${this.url}fetch-course-details/${course_id}?page=${page}`);
  }

  updateCourse(data, course_id) {
    let formData = new FormData();
    formData.append('course_name', data.course_name);
    formData.append('course_image', data.cover_image);
    formData.append('description', data.description);
    formData.append('course_category', data.course_category);
    formData.append('enroll_amount', data.enroll_amount);
    formData.append('cid', course_id);
    return this.httpClient.post(`${this.url}edit-course-details`, formData);
  }

  createCoursePath(data) {
    let formData = new FormData();
    formData.append('course_module_name', data.course_name);
    formData.append('course_video', data.course_video);
    formData.append('course_id', data.course_id);
    formData.append('duration', data.duration);
    return this.httpClient.post(`${this.url}create-course-module`, formData);
  }

  fetchCoursePathDetails(course_id) {
    return this.httpClient.get(`${this.url}fetch-course-module-details/${course_id}`);
  }

  updateCoursePath(data) {
    let formData = new FormData();
    formData.append('course_module_name', data.course_name);
    formData.append('course_video', data.course_video);
    formData.append('course_id', data.course_id);
    formData.append('duration', data.duration);
    return this.httpClient.post(`${this.url}update-course-module-details`, formData);
  }

  fetchTutor(page = 1) {
    return this.httpClient.get(`${this.url}fetch-tutors?page=${page}`);
  }

  createTutor(data) {
    return this.httpClient.post(`${this.url}create-tutors`, data);
  }

  fetchTutorDetails(course_id, page = 1) {
    return this.httpClient.get(`${this.url}fetch-tutor-details/${course_id}?page=${page}`);
  }

  uploadPhotoId(photo_id, tutor_id) {
    let formData = new FormData();
    formData.append('photo_id', photo_id);
    formData.append('tutor_id', tutor_id);
    return this.httpClient.post(`${this.url}upload-tutor-photo_id`, formData);
  }

  uploadProfileImage(profile_image, tutor_id) {
    let formData = new FormData();
    formData.append('avater', profile_image);
    formData.append('tutor_id', tutor_id);
    return this.httpClient.post(`${this.url}upload-tutor-profile-image`, formData);
  }

  updateTutor(data) {
    return this.httpClient.put(`${this.url}update-tutor-profile`, data);
  }

  fetchAssignDetails(data) {
    return this.httpClient.get(`${this.url}fetch-assign-details/${data.type}/${data.id}?page=${data.page}`);
  }

  assignTutor(data) {
    return this.httpClient.post(`${this.url}assign-tutor-course`, data);
  }

  unAssignTutor(data) {
    return this.httpClient.post(`${this.url}un-assign-tutor`, data);
  }

  fetchStudent(page = 1) {
    return this.httpClient.get(`${this.url}fetch-students?page=${page}`);
  }

  createStudent(data) {
    return this.httpClient.post(`${this.url}create-student`, data);
  }

  fetchStudentDetails(student_id, page = 1) {
    return this.httpClient.get(`${this.url}student-details/${student_id}?page=${page}`);
  }

  updateStudentDetails(data) {
    return this.httpClient.put(`${this.url}edit-students`, data);
  }

  fetchEnrollDetails(data) {
    return this.httpClient.get(`${this.url}fetch-enroll/${data.type}/${data.id}?page=${data.page}`);
  }

  enrollStudent(data) {
    return this.httpClient.post(`${this.url}enroll-student`, data);
  }

  unEnrollStudent(data) {
    return this.httpClient.post(`${this.url}un-enroll-student`, data);
  }

  fetchSupport(page) {
    return this.httpClient.get(`${this.url}fetch-support?page=${page}`);
  }

  fetchSupportDetails(page, support_id) {
    return this.httpClient.get(`${this.url}fetch-support-details/${support_id}?page=${page}`);
  }
}
