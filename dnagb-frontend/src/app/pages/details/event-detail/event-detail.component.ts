import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../0_global-services/state.service';
import { EventItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environment/env';
import { SafeHtmlPipe } from '../../../2_pipes/safeHtml';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, SafeHtmlPipe, DatePipe],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  protected state = inject(StateService);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  event!: EventItem;
  url = environment.cmsUrl;
  mapsLink!: string;

  goBackToPrevPage(): void {
    window.history.back();
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    this.event = this.state
      .getConf()
      .events.find((f: { id: any }) => Number(f.id) === Number(id));

    let street = this.event.street;
    let number = this.event.number;
    let postalCode = this.event.postal_code;
    let city = this.event.city;
    this.mapsLink = `https://www.google.de/maps/place/${street}+${number},+${postalCode}+${city}`;

    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.titleService.setTitle(
          res['title'] + ` · ${this.state.getConf().appSettings.title.short}`
        );
        if (!res) {
          return;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
