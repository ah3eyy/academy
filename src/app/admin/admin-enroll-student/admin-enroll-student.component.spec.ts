import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollStudentComponent } from './admin-enroll-student.component';

describe('AdminEnrollStudentComponent', () => {
  let component: AdminEnrollStudentComponent;
  let fixture: ComponentFixture<AdminEnrollStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnrollStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrollStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
