import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit {
  data!: NewsItem;
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
      .news.find((f: { id: any }) => Number(f.id) === Number(id));
    console.log(this.data, id);
  }
}
