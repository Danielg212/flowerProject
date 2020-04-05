import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstinenceDaysCalcComponent } from './abstinence-days-calc.component';

describe('AbstinenceDaysCalcComponent', () => {
  let component: AbstinenceDaysCalcComponent;
  let fixture: ComponentFixture<AbstinenceDaysCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstinenceDaysCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstinenceDaysCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
