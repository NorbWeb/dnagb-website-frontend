import { Component, OnInit } from '@angular/core';

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
  exampleData: NewsItem[] = [
    {
      title: 'Seminar in XY',
      type: ['Wettkampf', 'Seminar'],
      startDate: new Date(2024, 10, 1, 9),
      endDate: new Date(2024, 10, 3, 18, 30),
      location: 'Fantasiestadt, Sporthalle SC Fantasie',
      announcement: '123-456-789',
    },
    {
      title: 'Deutsche Meisterschaft',
      type: ['Wettkampf', 'Prüfung'],
      startDate: new Date(2024, 6, 15, 9),
      location: 'Berlin, Sporthalle SC Meisterschaft',
      announcement: '10-5654-4554',
    },
    {
      title: 'Test 1',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 11, 24, 9),
      location: 'Teststadt 1',
      announcement: '7543-7585648',
    },
    {
      title: 'Test 2',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 7, 10, 9),
      location: 'Teststadt 2',
      announcement: '7543-7585648',
    },
    {
      title: 'Test 3',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 11, 15, 9),
      location: 'Teststadt 3',
      announcement: '7543-7585648',
    },
    {
      title: 'Osterereigniss',
      type: ['Seminar'],
      startDate: new Date(2024, 2, 1, 9),
      location: 'Wumpa-Wumpa, Heilige Wolke 7',
      announcement: '7543-7585648',
    },
  ];

  convertDate(arr: NewsItem[]) {
    arr.sort((a: any, b: any) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });

    for (const item of arr) {
      // TODO Check if date in event is passed
      if (item.startDate < this.today) {
        this.expiredNews.push(item);
      } else {
        this.news.push(item);
      }
    }
  }

  ngOnInit(): void {
    this.convertDate(this.exampleData);
  }
}
