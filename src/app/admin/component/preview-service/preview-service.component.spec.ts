import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewServiceComponent } from './preview-service.component';

describe('PreviewServiceComponent', () => {
  let component: PreviewServiceComponent;
  let fixture: ComponentFixture<PreviewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
