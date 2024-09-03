import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit {
  data!: NewsItem;

  constructor(private route: ActivatedRoute, private state: StateService) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.data = this.state.getConf().news.find((f: { id: any }) => f.id == id);
    console.log(this.data, id);
  }
}
