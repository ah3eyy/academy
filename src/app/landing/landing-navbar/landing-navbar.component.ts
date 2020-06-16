import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss']
})
export class LandingNavbarComponent implements OnInit, OnChanges {
  @Input() headerType;
  @Input() otherDetails;

  constructor() {
  }

  ngOnInit() {
    console.log(this.otherDetails)
  }

  ngOnChanges(): void {

  }

}
