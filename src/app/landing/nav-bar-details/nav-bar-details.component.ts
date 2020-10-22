import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar-details',
  templateUrl: './nav-bar-details.component.html',
  styleUrls: ['./nav-bar-details.component.scss']
})
export class NavBarDetailsComponent implements OnInit, OnChanges {

  @Input() details;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {
    this.details = this.details;
    console.log(this.details);
  }

}
