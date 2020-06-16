import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCourseDetailsComponent } from './landing-course-details.component';

describe('LandingCourseDetailsComponent', () => {
  let component: LandingCourseDetailsComponent;
  let fixture: ComponentFixture<LandingCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCourseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
