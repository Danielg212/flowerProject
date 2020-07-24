import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikvehListComponent } from './mikveh-list.component';

describe('MikvehListComponent', () => {
  let component: MikvehListComponent;
  let fixture: ComponentFixture<MikvehListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikvehListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikvehListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
