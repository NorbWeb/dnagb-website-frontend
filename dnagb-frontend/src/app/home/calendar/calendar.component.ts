import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  weekday = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  month = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  startDate = {
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear(),
  };
  displayedDays: any[] = [];
  monthCounter: number = 0;

  constructor() {}

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  initCalendar() {
    let days = this.getDaysInMonth(this.currentYear, this.currentMonth + 1); // Number of days in current month
    let firstDay = new Date(
      `${this.currentYear}-${this.currentMonth + 1}-01`
    ).getDay(); // To get start weekday

    let lastDayMonthBefore = this.getDaysInMonth(
      this.currentYear,
      this.currentMonth
    ); // Last day of month before current month
    let monthBefor = []; // Holds all days for weekday gap before current month
    let month = []; // Holds all days of current month
    let monthAfter = []; // Holds all days for weekday gap after current month

    let dayBeforeCount = lastDayMonthBefore - firstDay + 2; // Helps calculate how many days you need before actual month

    if (firstDay === 0) {
      dayBeforeCount = lastDayMonthBefore - 5;
    }

    for (let b = lastDayMonthBefore; b >= dayBeforeCount; b--) {
      let dateObject = new Date(
        `${this.currentYear}-${this.currentMonth}-${b}`
      );

      monthBefor.unshift({
        label: b,
        inMonth: false,
        date: dateObject,
        today: false,
      });
    }

    for (let i = 1; i <= days; i++) {
      let dateObject = new Date(
        `${this.currentYear}-${this.currentMonth + 1}-${i}`
      );

      // To find today and set boolean to true
      if (
        this.currentDate.getDate() === dateObject.getDate() &&
        this.currentDate.getMonth() === dateObject.getMonth() &&
        this.currentDate.getFullYear() === dateObject.getFullYear()
      ) {
        month.push({ label: i, inMonth: true, date: dateObject, today: true });
      } else {
        month.push({ label: i, inMonth: true, date: dateObject, today: false });
      }
    }

    let diff = 42 - (monthBefor.length + month.length); // There are always 42 days shown per calendar sheet to have even optic

    for (let a = 1; a <= diff; a++) {
      let dateObject = new Date(
        `${this.currentYear}-${this.currentMonth + 2}-${a}`
      );

      monthAfter.push({
        label: a,
        inMonth: false,
        date: dateObject,
        today: false,
      });
    }

    this.displayedDays = [...monthBefor, ...month, ...monthAfter];
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      ++this.currentYear;
    } else {
      ++this.currentMonth;
    }
    this.initCalendar();
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      --this.currentYear;
    } else {
      --this.currentMonth;
    }
    this.initCalendar();
  }

  goToCurrentDate() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.initCalendar();
  }

  ngOnInit(): void {
    ++this.currentMonth;
    this.initCalendar();
  }
}
