import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  mobile: boolean = false;
  today: Date = new Date();
  news: NewsItem[] = [];
  expiredNews: NewsItem[] = [];
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

    this.news = [...arr];
  }

  openDetails(id: number | string) {
    this.router.navigateByUrl(`/news-details/${id}`);
  }

  ngOnInit(): void {
    this.convertDate(this.state.getConf().events);
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
