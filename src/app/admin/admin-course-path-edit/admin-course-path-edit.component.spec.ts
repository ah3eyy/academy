import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursePathEditComponent } from './admin-course-path-edit.component';

describe('AdminCoursePathEditComponent', () => {
  let component: AdminCoursePathEditComponent;
  let fixture: ComponentFixture<AdminCoursePathEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCoursePathEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoursePathEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
