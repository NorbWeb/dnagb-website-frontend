import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CalendarMonth } from '../../1_types-and-interfaces/calendarMonth';
import { EventItem } from '../../1_types-and-interfaces/NewsItem';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, OnDestroy {
  state = inject(StateService);
  events: EventItem[] = [];
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

  today: Date = new Date();
  selectedDate: Date = new Date();
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth();
  startDate = {
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear(),
  };
  displayedDays: CalendarMonth[] = [];
  monthCounter: number = 0;

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  findEventDateExactMatch(date: Date) {
    let result = undefined;
    for (const element of this.events) {
      if (
        date.getDate() === element.date_start?.getDate() &&
        date.getMonth() === element.date_start.getMonth() &&
        date.getFullYear() === element.date_start.getFullYear()
      ) {
        result = element;
      }
    }
    return result;
  }

  openEventBox(e: any, id: number) {
    e.stopPropagation();
    this.state.updateNoteBox({ ...this.state.getNoteBox(), open: true });
    let newState = this.state
      .getConf()
      .events.find((f: { id: number }) => f.id === id);
    this.state.updateEventState(newState);
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
    let monthBefor: CalendarMonth[] = []; // Holds all days for weekday gap before current month
    let month: CalendarMonth[] = []; // Holds all days of current month
    let monthAfter: CalendarMonth[] = []; // Holds all days for weekday gap after current month

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
        this.today.getDate() === dateObject.getDate() &&
        this.today.getMonth() === dateObject.getMonth() &&
        this.today.getFullYear() === dateObject.getFullYear()
      ) {
        this.selectedDate = structuredClone(dateObject);
        month.push({
          label: i,
          inMonth: true,
          date: dateObject,
          today: true,
          event: this.findEventDateExactMatch(dateObject),
        });
      } else {
        month.push({
          label: i,
          inMonth: true,
          date: dateObject,
          today: false,
          event: this.findEventDateExactMatch(dateObject),
        });
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
      this.currentDate.setFullYear(this.currentYear);
    } else {
      ++this.currentMonth;
    }
    this.currentDate.setMonth(this.currentMonth);

    this.selectedDate = structuredClone(this.currentDate);
    this.initCalendar();
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      --this.currentYear;
      this.currentDate.setFullYear(this.currentYear);
    } else {
      --this.currentMonth;
    }
    this.currentDate.setMonth(this.currentMonth);

    this.selectedDate = structuredClone(this.currentDate);
    this.initCalendar();
  }

  goToToday() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.selectedDate = this.currentDate;
    this.initCalendar();
  }

  goToPrevEvent() {
    let prevEvent = undefined;
    let eventsCopy: EventItem[] = [];
    // Skip events in same months, to switch to prev month
    for (let i = 0; i < this.events.length; i++) {
      const exists = eventsCopy.some(
        (e) =>
          e.date_start.getMonth() === this.events[i].date_start.getMonth() &&
          e.date_start.getFullYear() === this.events[i].date_start.getFullYear()
      );
      if (!exists) {
        eventsCopy.push(this.events[i]);
      }
    }

    for (let i = 0; i < eventsCopy.length; i++) {
      if (eventsCopy[i].date_start < this.selectedDate) {
        prevEvent = eventsCopy[i];
        this.currentDate =
          typeof prevEvent.date_start === 'string'
            ? new Date(prevEvent.date_start)
            : structuredClone(prevEvent.date_start);
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedDate = structuredClone(this.currentDate);
        this.initCalendar();

        break;
      }
    }
    if (!prevEvent) {
      return;
    }
  }

  goToNextEvent() {
    let nextEvent = undefined;
    let eventsCopy: EventItem[] = [];
    // Skip events in same months, to switch to next month
    for (let i = 0; i < this.events.length; i++) {
      const exists = eventsCopy.some(
        (e) =>
          e.date_start.getMonth() === this.events[i].date_start.getMonth() &&
          e.date_start.getFullYear() === this.events[i].date_start.getFullYear()
      );
      if (!exists) {
        eventsCopy.push(this.events[i]);
      }
    }

    for (let i = eventsCopy.length - 1; i >= 0; i--) {
      if (eventsCopy[i].date_start > this.selectedDate) {
        nextEvent = eventsCopy[i];
        this.currentDate =
          typeof nextEvent.date_start === 'string'
            ? new Date(nextEvent.date_start)
            : structuredClone(nextEvent.date_start);
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedDate = structuredClone(this.currentDate);
        this.initCalendar();

        break;
      }
    }
    if (!nextEvent) {
      return;
    }
  }

  ngOnInit(): void {
    this.events = this.state.getConf().events;
    this.initCalendar();
  }
  ngOnDestroy(): void {}
}
