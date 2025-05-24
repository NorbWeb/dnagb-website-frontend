import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { EventItem } from '../../1_types-and-interfaces/NewsItem';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [DatePipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent {
  state = inject(StateService);
  router = inject(Router);
  list!: EventItem[];

  openDetails(type: 'event' | 'news', id: number | string) {
    if (type === 'event') {
      this.router.navigateByUrl(`/event-details/${id}`);
    }
    if (type === 'news') {
      this.router.navigateByUrl(`/news-details/${id}`);
    }
  }

  ngOnInit(): void {
    if (this.state.getConf().events[0].date_start >= new Date()) {
      this.list = this.state.getConf().events;
    }
    console.log(`🐦‍⬛: EventListComponent -> this.list`, this.list);
  }
}
