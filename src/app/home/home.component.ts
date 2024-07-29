import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setCurrentDate();
  }

  setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      const currentDate = new Date();
      dateElement.textContent = currentDate.toDateString();
    }
  }
}
