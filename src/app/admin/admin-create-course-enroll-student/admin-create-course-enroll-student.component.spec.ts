import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCourseEnrollStudentComponent } from './admin-create-course-enroll-student.component';

describe('AdminCreateCourseEnrollStudentComponent', () => {
  let component: AdminCreateCourseEnrollStudentComponent;
  let fixture: ComponentFixture<AdminCreateCourseEnrollStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateCourseEnrollStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCourseEnrollStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
