import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../0_global-services/state.service';
import { NewsItem } from '../../../1_types-and-interfaces/NewsItem';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environment/env';
import { SafeHtmlPipe } from '../../../2_pipes/safeHtml';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  imports: [CommonModule, SafeHtmlPipe, DatePipe],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NewsDetailComponent {
  private route = inject(ActivatedRoute);
  protected state = inject(StateService);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  news!: NewsItem;
  url = environment.cmsUrl;
  mapsLink!: string;

  goBackToPrevPage(): void {
    window.history.back();
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    this.news = this.state
      .getConf()
      .news.find((f: { id: any }) => Number(f.id) === Number(id));

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
