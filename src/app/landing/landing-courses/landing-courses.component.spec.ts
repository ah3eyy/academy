import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCoursesComponent } from './landing-courses.component';

describe('LandingCoursesComponent', () => {
  let component: LandingCoursesComponent;
  let fixture: ComponentFixture<LandingCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
