import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFooterbarComponent } from './landing-footerbar.component';

describe('LandingFooterbarComponent', () => {
  let component: LandingFooterbarComponent;
  let fixture: ComponentFixture<LandingFooterbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingFooterbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFooterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
