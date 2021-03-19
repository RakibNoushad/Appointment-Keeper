import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingSlotComponent } from './visiting-slot.component';

describe('VisitingSlotComponent', () => {
  let component: VisitingSlotComponent;
  let fixture: ComponentFixture<VisitingSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
