import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment/env';
import { Card } from '../../1_types-and-interfaces/card.interface';

@Component({
  selector: 'app-card',
  imports: [DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  public data = input<Card>({
    id: 0,
    status: '',
    sort: null,
    user_created: '',
    date_created: '',
    user_updated: '',
    date_updated: '',
    article: '',
    image: '',
    title: '',
    announcement: '',
    date_start: '',
    author: '',
  });

  private router = inject(Router);
  url = environment.cmsUrl;

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  openDetails(type: 'event' | 'news', id: number | string) {
    if (type === 'event') {
      this.router.navigateByUrl(`/news/event-details/${id}`);
    }
    if (type === 'news') {
      this.router.navigateByUrl(`/news/news-details/${id}`);
    }
  }
}
