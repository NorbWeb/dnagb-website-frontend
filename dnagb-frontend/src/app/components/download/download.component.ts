import { Component } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  files!: any;
  headers: string[] = [];
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().downloads.status === 'published')
      this.files = this.state.getConf().downloads.files;
    for (const file of this.files) {
      this.headers.push(file.data.tags);
    }

    console.log(this.headers);
  }
}
