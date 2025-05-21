import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../0_global-services/state.service';
import { NewsItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environment/env';

@Component({
  selector: 'app-event',
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit, OnDestroy {
  url = environment.cmsUrl;
  unsubscribeAll = new Subject();
  mobile: boolean = false;
  today: Date = new Date();
  events: NewsItem[] = [];
  news: any = [];
  options: any = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
  };

  constructor(private state: StateService, private router: Router) {}

  convertDate(arr: NewsItem[]) {
    arr.sort((a: any, b: any) => {
      return a.date_start - b.date_start;
    });

    this.events = [...arr];
    console.log(
      `🐦‍⬛: EventComponent -> convertDate -> this.events`,
      this.events
    );
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
    this.convertDate(this.state.getConf().events);
    this.news = this.state.getConf().news;
    console.log(`🐦‍⬛: EventComponent -> constructor -> this.news`, this.news);
    this.state.windowSize.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res: any) => {
        if (res.screenWidth <= 768) {
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
