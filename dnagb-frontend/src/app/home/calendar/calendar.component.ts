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
  displayedDays: number[] = [];
  weekday = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  monthCounter: number = 0;

  constructor() {}

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  initCalendar() {
    let days = this.getDaysInMonth(this.currentYear, this.currentMonth); // Number of days in current month
    let firstDay = new Date(`${this.currentYear}-${this.currentMonth}-01`); // To get start weekday
    let lastDay = new Date(this.currentYear, this.currentMonth, 0); // To get end weekday
    let lastDayMonthBefore = this.getDaysInMonth(
      this.currentYear,
      this.currentMonth - 1
    ); // Last day of month before current month
    let startDayMonthBefore = lastDayMonthBefore - 6 + firstDay.getDay(); // Start day in month before. Is needed to get all days that fills gaps if current month did not start on monday
    let monthBefor = []; // Holds all days for weekday gap before current month
    let month = []; // Holds all days of current month
    let monthAfter = []; // Holds all days for weekday gap after current month

    if (firstDay.getDay() !== 0) {
      for (let b = startDayMonthBefore; b <= lastDayMonthBefore; b++) {
        monthBefor.push(b);
      }
    }

    for (let i = 1; i <= days; i++) {
      month.push(i);
    }

    if (lastDay.getDay() !== 0) {
      for (let a = 1; a < 7 - lastDay.getDay(); a++) {
        monthAfter.push(a);
      }
    }

    this.displayedDays = [...monthBefor, ...month, ...monthAfter];
  }

  nextMonth() {
    ++this.monthCounter;
    this.currentMonth = this.date.getMonth() + this.monthCounter;
    this.initCalendar();
  }

  prevMonth() {
    --this.monthCounter;
    this.currentMonth = this.date.getMonth() - this.monthCounter;
    this.initCalendar();
  }

  ngOnInit(): void {
    this.initCalendar();
  }
}
