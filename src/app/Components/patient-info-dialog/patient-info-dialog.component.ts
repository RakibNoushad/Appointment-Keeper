import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor-service.service';
import { Appointment } from '../schedule/schedule/schedule.component';

@Component({
  selector: 'app-patient-info-dialog',
  templateUrl: './patient-info-dialog.component.html',
  styleUrls: ['./patient-info-dialog.component.css'],
})
export class PatientInfoDialog {
  patientForm!: FormGroup;
  fNameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[- +()0-9]+'),
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.patientForm = this.formBuilder.group({
      firstName: this.fNameFormControl,
      lastName: [''],
      phone: this.phoneFormControl,
      visitReason: [''],
    });
  }

  async addNewAppointment() {
    console.log('okay');
    const id = 1;
    const doctor = this.data.doctor;
    const date = this.data.date;
    const start = this.data.start;
    const patientName = this.patientForm.controls.firstName.value;
    const patientPhone = this.patientForm.controls.phone.value;
    const visitReason = this.patientForm.controls.visitReason.value;

    let appointment: Appointment = new Appointment(
      id,
      doctor,
      date,
      start,
      patientName,
      patientPhone,
      visitReason
    );

    try {
      await this.doctorService.addAppointment(appointment).subscribe((user) => {
        console.log(user);
      });
      this.openSnackBar('Appointment created successfully', 'Close');
    } catch (error) {
      console.log(error);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
