import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentDetailsComponent } from './admin-student-details.component';

describe('AdminStudentDetailsComponent', () => {
  let component: AdminStudentDetailsComponent;
  let fixture: ComponentFixture<AdminStudentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
