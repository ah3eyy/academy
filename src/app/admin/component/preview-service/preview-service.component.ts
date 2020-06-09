import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-preview-service',
  templateUrl: './preview-service.component.html',
  styleUrls: ['./preview-service.component.scss']
})
export class PreviewServiceComponent implements OnInit {

  externalLink = environment.api_url_link;

  @Input() showImage: any;

  constructor() {
  }

  ngOnInit() {
  }

  onFailed(event) {
    console.log(event);
  }

  onClose() {
    this.showImage = {};
  }
}
