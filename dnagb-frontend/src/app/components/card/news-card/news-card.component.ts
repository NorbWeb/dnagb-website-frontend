import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/env';
import { NewsItem } from '../../../1_types-and-interfaces/NewsItem';

@Component({
  selector: 'app-news-card',
  imports: [DatePipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent {
  public data = input<NewsItem>({
    announcement: '',
    article: '',
    id: 0,
    image: '',
    date_start: '',
    title: '',
    status: '',
    author: '',
  });

  private router = inject(Router);
  url = environment.cmsUrl;

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  openDetails(id: number | string) {
    this.router.navigateByUrl(`/news/news-details/${id}`);
  }
}
