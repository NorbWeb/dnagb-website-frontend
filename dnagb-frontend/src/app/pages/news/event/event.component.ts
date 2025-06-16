import { Component, inject } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';
import { EventItem, NewsItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../../../components/card/news-card/news-card.component';
import { EventCardComponent } from '../../../components/card/event-card/event-card.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-event',
  imports: [CommonModule, NewsCardComponent, EventCardComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  private state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  events: EventItem[] = [];
  news: NewsItem[] = [];

  ngOnInit(): void {
    this.events = this.state.getConf().events;
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
