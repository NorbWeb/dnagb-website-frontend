import { Component, inject, OnInit, signal } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
// import { CalendarComponent } from '../../components/calendar/calendar.component';
import { Router } from '@angular/router';
import { environment } from '../../../environment/env';
import { NgStyle } from '@angular/common';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { NewsCardComponent } from '../../components/card/news-card/news-card.component';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';

interface Title {
  short: string;
  long_1: string;
  long_2: string;
}

@Component({
  selector: 'app-home',
  imports: [
    // CalendarComponent,
    EventListComponent,
    NewsCardComponent,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  url = environment.cmsUrl;
  title!: Title;
  news: NewsItem[] = [];
  bannerImage: string = 'url(./assets/placeholder.jpg)';
  private state = inject(StateService);
  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.title = this.state.getConf().appSettings.title;
    this.news = [...this.state.getConf().news].splice(0, 2);
    if (this.state.getConf().appSettings.banner) {
      this.bannerImage = `url(${this.url}/assets/${
        this.state.getConf().appSettings.banner
      })`;
    }
  }
}
