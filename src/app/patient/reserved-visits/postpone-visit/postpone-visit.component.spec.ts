import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostponeVisitComponent } from './postpone-visit.component';

describe('PostponeVisitComponent', () => {
  let component: PostponeVisitComponent;
  let fixture: ComponentFixture<PostponeVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostponeVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostponeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
