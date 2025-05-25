import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { SafeUrlPipe } from '../../2_pipes/safeUrl';

@Component({
  selector: 'app-download',
  imports: [SafeUrlPipe],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  state = inject(StateService);
  files!: any;
  headers: string[] = [];
  url = environment.cmsUrl;
  activeData!: string;

  @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLDialogElement>;

  directDownload(e: Event, url: string) {
    e.stopPropagation();
    window.location.assign(url);
  }

  setActiveData(first: string, last: string) {
    // let target = document.getElementById('pdfViewer');
    this.activeData = `${first}/assets/${last}`;
    this.pdfViewer.nativeElement.showModal();
  }

  closePdfViewerDialog() {
    this.pdfViewer.nativeElement.close();
  }

  openDownload(url: string, id: string) {
    console.log(`🐦‍⬛: DownloadComponent -> openDownload -> url`, url);
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
  }
}
