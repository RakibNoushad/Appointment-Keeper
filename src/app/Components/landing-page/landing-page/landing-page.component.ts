import { Component, OnInit } from '@angular/core';
import doctors from '../../../doctors-info.json';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  doctor = new FormControl('', [Validators.required]);
  img = '../../../../assets/Image/doctorp.png';

  public doctors: {
    name: string;
    org: string;
    availability: object;
    visitDurationInMin: number;
  }[] = doctors;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  schedule() {
    const value = this.doctor.value;
    this.router.navigate(['schedule'], value);
  }
}
