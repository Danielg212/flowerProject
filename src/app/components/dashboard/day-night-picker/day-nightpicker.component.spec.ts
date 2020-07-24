import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayNightpickerComponent } from './day-nightpicker.component';

describe('DayNightpickerComponent', () => {
  let component: DayNightpickerComponent;
  let fixture: ComponentFixture<DayNightpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayNightpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayNightpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
