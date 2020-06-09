import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTutorDetailsComponent } from './admin-edit-tutor-details.component';

describe('AdminEditTutorDetailsComponent', () => {
  let component: AdminEditTutorDetailsComponent;
  let fixture: ComponentFixture<AdminEditTutorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditTutorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTutorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
