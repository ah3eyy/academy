import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCourseComponent } from './admin-create-course.component';

describe('AdminCreateCourseComponent', () => {
  let component: AdminCreateCourseComponent;
  let fixture: ComponentFixture<AdminCreateCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
