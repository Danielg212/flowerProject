import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalsDiaryComponent } from './intervals-diary.component';

describe('IntervalsDiaryComponent', () => {
  let component: IntervalsDiaryComponent;
  let fixture: ComponentFixture<IntervalsDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalsDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalsDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
