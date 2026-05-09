import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrls: ['./back-button.css'],
})
export class BackButton {
  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
