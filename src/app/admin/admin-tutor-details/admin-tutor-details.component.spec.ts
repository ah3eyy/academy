import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorDetailsComponent } from './admin-tutor-details.component';

describe('AdminTutorDetailsComponent', () => {
  let component: AdminTutorDetailsComponent;
  let fixture: ComponentFixture<AdminTutorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTutorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
