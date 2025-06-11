import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';
import { EventItem, NewsItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsCardComponent } from '../../../components/card/news-card/news-card.component';
import { EventCardComponent } from '../../../components/card/event-card/event-card.component';

@Component({
  selector: 'app-event',
  imports: [CommonModule, DatePipe, NewsCardComponent, EventCardComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  private state = inject(StateService);

  events: EventItem[] = [];
  news: NewsItem[] = [];

  ngOnInit(): void {
    this.events = this.state.getConf().events;
    this.news = this.state.getConf().news;
  }
}
