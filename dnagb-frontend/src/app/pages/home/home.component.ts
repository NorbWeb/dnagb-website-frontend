import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
// import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/env';
import { NgStyle } from '@angular/common';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { NewsCardComponent } from '../../components/card/news-card/news-card.component';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

interface AppTitle {
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
export class HomeComponent {
  url = environment.cmsUrl;
  title!: AppTitle;
  news: NewsItem[] = [];
  bannerImage: string = 'url(./assets/placeholder.jpg)';
  private state = inject(StateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.titleService.setTitle(
          res['title'] + ` · ${this.state.getConf().appSettings.title.short}`
        );
        if (!res) {
          return;
        }
      },
    });

    this.title = this.state.getConf().appSettings.title;
    this.news = [...this.state.getConf().news].splice(0, 2);
    if (this.state.getConf().appSettings.banner) {
      this.bannerImage = `url(${this.url}/assets/${
        this.state.getConf().appSettings.banner
      })`;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
