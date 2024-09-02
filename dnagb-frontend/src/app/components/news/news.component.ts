import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';

interface NewsItem {
  title: string;
  type: ('Wettkampf' | 'Seminar' | 'Prüfung')[];
  startDate: Date | string;
  endDate?: Date | string;
  location: string;
  announcement: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  constructor(private state: StateService, private router: Router) {}

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

  convertDate(arr: NewsItem[]) {
    arr.sort((a: any, b: any) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });

    for (const item of arr) {
      if (item.startDate < this.today) {
        this.expiredNews.push(item);
      } else {
        this.news.push(item);
      }
    }
  }

  openDetails(id: string) {
    this.router.navigateByUrl(`/news-details/${id}`);
  }

  ngOnInit(): void {
    this.convertDate(this.state.getConf().news);
  }
}
