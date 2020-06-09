import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCourseModuleDetailsComponent } from './tutor-course-module-details.component';

describe('TutorCourseModuleDetailsComponent', () => {
  let component: TutorCourseModuleDetailsComponent;
  let fixture: ComponentFixture<TutorCourseModuleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorCourseModuleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCourseModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
