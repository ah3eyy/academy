import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSupportComponent } from './tutor-support.component';

describe('TutorSupportComponent', () => {
  let component: TutorSupportComponent;
  let fixture: ComponentFixture<TutorSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
