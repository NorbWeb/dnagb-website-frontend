import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { SafeUrlPipe } from '../../2_pipes/safeUrl';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-download',
  imports: [SafeUrlPipe],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  files!: any;
  headers: string[] = [];
  url = environment.cmsUrl;
  activeData!: string;

  directDownload(e: Event, url: string) {
    e.stopPropagation();
    window.location.assign(url);
  }

  restetActiveData() {
    this.activeData = '';
  }

  setActiveData(first: string, last: string) {
    this.activeData = `${first}/assets/${last}`;
  }

  openDownload(url: string, id: string) {
    window.open(`${url}/assets/${id}?download`, '_blank');
  }

  ngOnInit(): void {
    if (this.state.getConf().downloads.status === 'published')
      this.files = this.state.getConf().downloads.files;

    this.files.sort((a: any, b: any) => {
      if (a.data.title.toLowerCase() > b.data.title.toLowerCase()) return 1;
      if (a.data.title.toLowerCase() < b.data.title.toLowerCase()) return -1;
      return 0;
    });
    for (const file of this.files) {
      if (file.data.tags.length) {
        for (const entry of file.data.tags) {
          if (!this.headers.includes(entry)) {
            this.headers.push(entry);
          }
        }
      } else {
        file.data.tags.push('Allgemein');
        if (!this.headers.includes('Allgemein')) {
          this.headers.push('Allgemein');
        }
      }
    }

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
