import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Appointment {
  id?: number;
  doctor: string;
  date: string;
  start: string;
  patientName: string;
  patientPhone: string;
  visitReason: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  doctorInfoUrl = '../assets/doctors-info.json';
  appointUrl =
    'https://my-json-server.typicode.com/RakibNoushad/server/appointments';
  slotUrl = '../assets/slots.json';
  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.doctorInfoUrl);
  }

  public getAppointment(): Observable<any> {
    return this.http.get(this.appointUrl);
  }

  public addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(this.appointUrl, appointment);
  }

  // public addSlot(schedule: Schedule): Observable<any> {
  //   return this.http.post(this.slotUrl, schedule);
  // }
}
