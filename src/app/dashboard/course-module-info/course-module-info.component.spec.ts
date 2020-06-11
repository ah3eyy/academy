import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleInfoComponent } from './course-module-info.component';

describe('CourseModuleInfoComponent', () => {
  let component: CourseModuleInfoComponent;
  let fixture: ComponentFixture<CourseModuleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModuleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModuleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
