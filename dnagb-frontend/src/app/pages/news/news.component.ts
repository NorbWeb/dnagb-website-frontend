import { Component, inject, signal } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { EventItem, NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../../components/card/news-card/news-card.component';
import { EventCardComponent } from '../../components/card/event-card/event-card.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToggleSwitchComponent } from '../../components/toggle-button/toggle-switch.component';

@Component({
  selector: 'app-news',
  imports: [
    CommonModule,
    NewsCardComponent,
    EventCardComponent,
    ToggleSwitchComponent,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  private state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();
  upcomingEventsOnly: boolean = true;

  events: EventItem[] = [];
  news: NewsItem[] = [];

  toggleOutdatedEvents(toggle: boolean = false): void {
    this.upcomingEventsOnly = toggle;

    if (this.upcomingEventsOnly) {
      this.events = this.state
        .getConf()
        .events.filter(
          (event: EventItem) => new Date(event.date_start) >= new Date()
        );
    } else {
      this.events = this.state.getConf().events;
    }
  }

  getOutputFromToggleButton(checked: boolean) {
    this.toggleOutdatedEvents(!checked);
  }

  ngOnInit(): void {
    this.toggleOutdatedEvents(this.upcomingEventsOnly);
    this.news = this.state.getConf().news;

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
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
