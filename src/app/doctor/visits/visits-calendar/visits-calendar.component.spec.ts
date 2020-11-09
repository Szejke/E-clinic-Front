import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsCalendarComponent } from './visits-calendar.component';

describe('VisitsCalendarComponent', () => {
  let component: VisitsCalendarComponent;
  let fixture: ComponentFixture<VisitsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
