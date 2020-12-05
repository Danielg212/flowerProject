import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TorahLessonsComponent} from './torah-lessons.component';

describe('TorahLessonsComponent', () => {
  let component: TorahLessonsComponent;
  let fixture: ComponentFixture<TorahLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorahLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorahLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
