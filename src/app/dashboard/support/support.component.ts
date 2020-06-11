import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {TutorService} from '../../auth/tutor.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  loading = false;

  network = false;

  success = false;

  support: any;

  counter: any;

  supportId = '';

  external_url = environment.api_url_link;

  loadingMessage = false;

  messageLoader = false;

  message;

  active;

  messageConfig = {last_page: '', current_page: ''};

  noMessageSelected = false;

  selectedUserDetails;

  sendFormat = {id: '', sid: '', to: '', from: '', message: '', sender: '', status: '', created_at: ''};

  userMessage = {message: '', support_id: '', to: '', from: ''};

  messageData;

  courseId;

  complain = {cid: '', message: ''};

  constructor(private tutorService: TutorService,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient
  ) {
    this.courseId = activatedRoute.params['value'].courseId;
  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getSupportDetails();
  }

  getSupportDetails(page = 1) {
    try {
      this.httpClient.get<any>(`${environment.api_url}v1/support/${this.courseId}`).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.support = success.data;


            return;
          }

          this.network = false;

        },
        error => {

          this.loading = false;

          this.network = true;

        }
      );
    } catch (e) {
      this.loading = false;

      this.network = true;
    }
  }

  onPrevious() {
  }

  onNext() {
  }

  selectMessage(index, page = 1) {

    this.noMessageSelected = true;

    this.active = index;

    this.loadingMessage = true;

    this.selectedUserDetails = this.support.support.data.reverse()[index];

    this.userMessage.from = this.selectedUserDetails.staff_id;

    this.userMessage.to = this.selectedUserDetails.user_id;

    this.userMessage.support_id = this.selectedUserDetails.id;

    this.httpClient.get<any>(`${environment.api_url}v1/send-message`).subscribe(
      (success: any) => {

        this.loading = false;

        if (success.code == 1) {

          this.message = success.data;

          this.messageData = this.message.message.data.reverse();

          this.support.support.data[index].conversation_count = false;

          this.messageLoader = true;

          this.messageConfig = {current_page: this.message.current_page, last_page: this.message.last_page};

          return;
        }

        this.network = false;

      },
      error => {

        this.loading = false;

        this.network = true;

      }
    );

  }

  sendMessage() {

    let index = (this.message.message.last_page == this.message.message.current_page) ?
      this.message.message.data.reverse().length : this.message.message.data.reverse().length * this.message.message.last_page;

    this.sendFormat = {
      id: index + 1,
      sid: this.message.message.data[0].sid,
      to: this.message.message.data[0].to,
      from: this.message.message.data[0].from,
      message: this.userMessage.message,
      sender: 'teacher',
      status: 'unread',
      created_at: 'now'
    };

    this.message.message.data.push(this.sendFormat);

    this.tutorService.sendMessage(this.userMessage).subscribe(
      (success: any) => {

        this.messageData = this.message.message.data.reverse();

        this.message.message.data[index + 1].created_at = success.data.message.created_at;

      },
      (error) => {

        this.message.message.data[index + 1].created_at = 'failed';

      }
    );

    this.userMessage.message = '';

  }

  onReload() {
    this.ngOnInit();
  }

}
