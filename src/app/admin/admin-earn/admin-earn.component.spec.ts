import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEarnComponent } from './admin-earn.component';

describe('AdminEarnComponent', () => {
  let component: AdminEarnComponent;
  let fixture: ComponentFixture<AdminEarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
