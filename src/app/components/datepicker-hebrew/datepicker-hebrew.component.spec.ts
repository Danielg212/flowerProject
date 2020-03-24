import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerHebrewComponent } from './datepicker-hebrew.component';

describe('DatepickerHebrewComponent', () => {
  let component: DatepickerHebrewComponent;
  let fixture: ComponentFixture<DatepickerHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
