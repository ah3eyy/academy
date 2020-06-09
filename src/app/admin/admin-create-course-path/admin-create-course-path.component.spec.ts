import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCoursePathComponent } from './admin-create-course-path.component';

describe('AdminCreateCoursePathComponent', () => {
  let component: AdminCreateCoursePathComponent;
  let fixture: ComponentFixture<AdminCreateCoursePathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateCoursePathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCoursePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
