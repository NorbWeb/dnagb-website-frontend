import { Component } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { SafePipe } from '../../2_pipes/safe';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  files!: any;
  headers: string[] = [];
  url = environment.cmsUrl;
  activeData!: string;

  constructor(private state: StateService) {}

  directDownload(e: Event, url: string) {
    e.stopPropagation();
    window.location.assign(url);
  }

  setActiveData(first: string, last: string) {
    let target = document.getElementById('pdfViewer');
    // target?.setAttribute('data', `${first}/assets/${last}`);
    this.activeData = `${first}/assets/${last}`;
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
  }
}
