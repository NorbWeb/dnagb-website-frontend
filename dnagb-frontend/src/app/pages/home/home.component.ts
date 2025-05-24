import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { Router } from '@angular/router';
import { environment } from '../../../environment/env';
import { DatePipe } from '@angular/common';
import { EventListComponent } from '../../components/event-list/event-list.component';

interface Title {
  short: string;
  long_1: string;
  long_2: string;
}

@Component({
  selector: 'app-home',
  imports: [CalendarComponent, EventListComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  url = environment.cmsUrl;
  title!: Title;
  frontpageNews: any[] = [];

  private state = inject(StateService);
  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  openDetails(type: 'event' | 'news', id: number | string) {
    if (type === 'event') {
      this.router.navigateByUrl(`/event-details/${id}`);
    }
    if (type === 'news') {
      this.router.navigateByUrl(`/news-details/${id}`);
    }
  }

  ngOnInit(): void {
    this.title = this.state.getConf().appSettings.title;
    this.frontpageNews = [...this.state.getConf().news].splice(0, 2);
  }
}
