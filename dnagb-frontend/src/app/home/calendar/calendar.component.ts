import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth() + 1;
  daysInCurrentMonth: number[] = [];

  constructor() {}

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  initCalendar() {
    let days = this.getDaysInMonth(this.currentYear, this.currentMonth);

    for (let i = 1; i <= days; i++) {
      this.daysInCurrentMonth?.push(i);
    }
  }

  ngOnInit(): void {
    this.initCalendar();
  }
}
