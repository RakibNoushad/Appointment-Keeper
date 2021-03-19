import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoDialog } from './patient-info-dialog.component';

describe('PatientInfoDialogComponent', () => {
  let component: PatientInfoDialog;
  let fixture: ComponentFixture<PatientInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientInfoDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
