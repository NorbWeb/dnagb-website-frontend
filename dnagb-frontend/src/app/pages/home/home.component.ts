import { Component, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { Router } from '@angular/router';

interface Title {
  short: string;
  long_1: string;
  long_2: string;
}

@Component({
    selector: 'app-home',
    imports: [CalendarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title!: Title;

  constructor(private state: StateService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.title = this.state.getConf().appSettings.title;
  }
}
