import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollNowComponent } from './enroll-now.component';

describe('EnrollNowComponent', () => {
  let component: EnrollNowComponent;
  let fixture: ComponentFixture<EnrollNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
