import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../0_global-services/state.service';
import { EventItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule, Location } from '@angular/common';
import { environment } from '../../../../environment/env';
import { SafeHtmlPipe } from '../../../2_pipes/safeHtml';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailComponent implements OnInit {
  event!: EventItem;
  news!: any;
  type!: 'event' | 'news';
  url = environment.cmsUrl;
  mapsLink!: string;
  options: any = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  constructor(
    private route: ActivatedRoute,
    private state: StateService,
    private location: Location
  ) {}

  goBackToPrevPage(): void {
    // this.location.back();
    window.history.back();
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const path = this.route.snapshot.routeConfig?.path;

    if (path === 'event-details/:id') {
      this.type = 'event';
      this.event = this.state
        .getConf()
        .events.find((f: { id: any }) => Number(f.id) === Number(id));

      // console.log(this.event, id);

      let street = this.event.street;
      let number = this.event.number;
      let postalCode = this.event.postal_code;
      let city = this.event.city;
      this.mapsLink = `https://www.google.de/maps/place/${street}+${number},+${postalCode}+${city}`;
    }

    if (path === 'news-details/:id') {
      this.type = 'news';
      this.news = this.state
        .getConf()
        .news.find((f: { id: any }) => Number(f.id) === Number(id));

      // console.log(this.news, id);
    }
  }
}
