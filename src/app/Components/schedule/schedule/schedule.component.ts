import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DoctorService } from 'src/app/Services/doctor-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientInfoDialog } from '../../patient-info-dialog/patient-info-dialog.component';

export class Appointment {
  id: number;
  doctor: string;
  date: string;
  start: string;
  patientName: string;
  patientPhone: string;
  visitReason: string;

  constructor(
    id: number,
    doctor: string,
    date: string,
    start: string,
    patientName: string,
    patientPhone: string,
    visitReason?: string
  ) {
    this.id = id ? id : 1;
    this.doctor = doctor;
    this.date = date;
    this.start = start;
    this.patientName = patientName;
    this.patientPhone = patientPhone;
    this.visitReason = visitReason ? visitReason : '';
  }
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  date = new FormControl('', [Validators.required]);
  minDate: Date;
  value: any;
  doctor: any;
  availDay: Array<number> = [];
  isSlotVisilble: boolean = false;
  totalSlots: string[] = [];
  bookedSlots: string[] = [];
  selectedDate: any;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    public dialog: MatDialog
  ) {
    this.value = this.router.getCurrentNavigation()!.extras;
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.doctorService.getJSON().subscribe((data) => {
      this.doctor = data[this.value];
      for (let day in this.doctor.availibility) {
        var temp = moment(day, 'ddd').format('d');
        this.availDay.push(parseInt(temp));
      }
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    var temp = this.availDay.find((x) => x == day);
    return day === temp;
  };

  async getSlots(d: any) {
    let date = d.value.toString();
    let day = date.substr(0, 3);
    date = date.substr(4, 11);
    this.selectedDate = date;
    let availTime = this.doctor.availibility[day.toLowerCase()];
    let times = availTime.split(' - ');
    let start = moment(times[0], 'hh:mm A');
    let end = moment(times[1], 'hh:mm A');
    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();

    await this.doctorService.getAppointment().subscribe((data) => {
      this.bookedSlots = [];
      for (let index in data) {
        let _data = data[index];
        if (_data.doctor === this.doctor.name && _data.date === date) {
          let _slot = _data.start;
          this.bookedSlots.push(_slot);
        }
      }
    });

    const slots = hours * 4;
    this.totalSlots = [];

    for (let i = 0; i < slots; i++) {
      this.totalSlots.push(
        moment(start)
          .add(15 * i, 'minutes')
          .format('hh:mm A')
      );
    }
  }

  isSlotBooked(slot: string) {
    return slot === this.bookedSlots.find((x) => x === slot);
  }

  openDialog(slot: string) {
    const dialogRef = this.dialog.open(PatientInfoDialog, {
      data: { start: slot, date: this.selectedDate, doctor: this.doctor.name },
    });

    dialogRef.afterClosed().subscribe((result: any) => {});
  }
}
