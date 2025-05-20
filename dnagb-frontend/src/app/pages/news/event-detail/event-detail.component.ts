import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../0_global-services/state.service';
import { NewsItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule, Location } from '@angular/common';
import { environment } from '../../../../environment/env';

@Component({
    selector: 'app-event-detail',
    imports: [CommonModule],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  data!: NewsItem;
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
    this.location.back();
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.data = this.state
      .getConf()
      .events.find((f: { id: any }) => Number(f.id) === Number(id));
    console.log(this.data, id);
    let street = this.data.street;
    let number = this.data.number;
    let postalCode = this.data.postal_code;
    let city = this.data.city;
    this.mapsLink = `https://www.google.de/maps/place/${street}+${number},+${postalCode}+${city}`;
  }
}
