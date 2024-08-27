import { Component, OnInit } from '@angular/core';
import { StateService } from '../0_global-services/state.service';
import { CalendarComponent } from './calendar/calendar.component';

interface Title {
  short: string;
  long_1: string;
  long_2: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title!: Title;

  constructor(private state: StateService) {}

  ngOnInit(): void {
    this.title = this.state.getSettings().appSettings.title;
    console.log(this.state.getSettings().appSettings.title);
  }
}
