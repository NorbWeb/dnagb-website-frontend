import { Component, inject, input } from '@angular/core';
import { EventItem } from '../../../1_types-and-interfaces/NewsItem';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/env';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  public data = input<EventItem>({
    title: '',
    type: [],
    date_start: '',
    date_end: '',
    past: false,
    location_name: '',
    street: '',
    number: '',
    city: '',
    postal_code: '',
    announcement: '',
    id: 0,
    description: '',
    status: '',
    image: '',
  });

  private router = inject(Router);
  url = environment.cmsUrl;

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  openDetails(id: number | string) {
    this.router.navigateByUrl(`/news/event-details/${id}`);
  }
}
