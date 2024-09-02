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
  news!: NewsItem[];
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
      title: 'Osterereigniss',
      type: ['Seminar'],
      startDate: new Date(2024, 2, 1, 9),
      location: 'Wumpa-Wumpa, Heilige Wolke 7',
      announcement: '7543-7585648',
    },
  ];

  convertDate(arr: NewsItem[]) {
    console.log('🐦‍⬛: NewsComponent -> convertDate -> arr', arr);
    let result = [];
    const options: any = {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
    };

    arr.sort((a: any, b: any) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });

    for (const item of arr) {
      item.startDate = item.startDate
        .toLocaleString('de-DE', options)
        .replace(',', '');
      if (item.endDate) {
        item.endDate = item.endDate
          .toLocaleString('de-DE', options)
          .replace(',', '');
      }
      // TODO Check if date in event is passed
      // if(item.startDate < this.today){}
      result.push(item);
    }

    return result;
  }

  ngOnInit(): void {
    this.news = [...this.convertDate(this.exampleData)];
  }
}
