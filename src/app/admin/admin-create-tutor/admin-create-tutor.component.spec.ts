import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTutorComponent } from './admin-create-tutor.component';

describe('AdminCreateTutorComponent', () => {
  let component: AdminCreateTutorComponent;
  let fixture: ComponentFixture<AdminCreateTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
