import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {AdminServicesService} from '../../auth/admin-services.service';
import {ActivatedRoute} from '@angular/router';
import {TutorService} from '../../auth/tutor.service';

@Component({
  selector: 'app-tutor-support',
  templateUrl: './tutor-support.component.html',
  styleUrls: ['./tutor-support.component.scss']
})
export class TutorSupportComponent implements OnInit {
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

  constructor(private tutorService: TutorService, private activetedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loading = true;
    this.network = false;
    this.success = false;
    this.getSupportDetails();
  }

  getSupportDetails(page = 1) {
    try {
      this.tutorService.fetchSupport(page).subscribe(
        (success: any) => {

          this.loading = false;

          if (success.code == 1) {

            this.success = true;

            this.support = success.data;

            // this.active = this.support.support.data[0].id;

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

    this.tutorService.fetchConversation(page, this.support.support.data.reverse()[index].id).subscribe(
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
