import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursePathDetailsComponent } from './admin-course-path-details.component';

describe('AdminCoursePathDetailsComponent', () => {
  let component: AdminCoursePathDetailsComponent;
  let fixture: ComponentFixture<AdminCoursePathDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCoursePathDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoursePathDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
