import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDetailsComponent } from './nav-bar-details.component';

describe('NavBarDetailsComponent', () => {
  let component: NavBarDetailsComponent;
  let fixture: ComponentFixture<NavBarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
