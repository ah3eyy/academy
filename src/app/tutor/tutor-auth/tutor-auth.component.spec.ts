import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAuthComponent } from './tutor-auth.component';

describe('TutorAuthComponent', () => {
  let component: TutorAuthComponent;
  let fixture: ComponentFixture<TutorAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
