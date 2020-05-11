import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges {

  @Input() alert: any;

  alertMessage;

  alerttype;

  status;

  //  expected types failed, success, error

  constructor() { }

  ngOnInit() {

    if (this.alert) {

      this.alertMessage = this.alert['message'];

      this.alerttype = this.alert['type'];

      this.status = this.alert['status'];

      if (this.status) {
        setTimeout(() => {

          this.status = false;

        }, 3000);
      }

    }


  }

  ngOnChanges() {
    if (this.alert) {

      this.alertMessage = this.alert['message'];

      this.alerttype = this.alert['type'];

      this.status = this.alert['status'];

      if (this.status) {
        setTimeout(() => {

          this.status = false;

        }, 3000);
      }

    }
  }


  onClose() {

    this.status = false;

  }

}
