import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedVisitsComponent } from './reserved-visits.component';

describe('ReservedVisitsComponent', () => {
  let component: ReservedVisitsComponent;
  let fixture: ComponentFixture<ReservedVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
