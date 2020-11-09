import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortVisitComponent } from './abort-visit.component';

describe('AbortVisitComponent', () => {
  let component: AbortVisitComponent;
  let fixture: ComponentFixture<AbortVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbortVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbortVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
