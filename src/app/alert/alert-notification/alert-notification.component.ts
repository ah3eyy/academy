import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss']
})
export class AlertNotificationComponent implements OnInit, OnChanges {

  @Input() alertData: any;

  constructor(private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {

    if (this.alertData) {

      setTimeout(() => {

        this.alertData = {'show': 'close'};

      }, 2000);

    }


  }

  ngOnChanges(): void {

    if (this.alertData) {

      setTimeout(() => {

        this.alertData = {};

      }, 1000);

    }
  }


}
