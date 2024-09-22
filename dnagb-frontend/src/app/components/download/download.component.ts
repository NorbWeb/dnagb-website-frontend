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
  file!: any;
  headers: any = [
    { label: 'Allgemein', value: 'general' },
    { label: 'Mitglieder', value: 'members' },
    { label: 'Prüfung', value: 'examination' },
    { label: 'Verein', value: 'association' },
  ];
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().downloads.status === 'published')
      this.file = this.state.getConf().files;
    console.log(
      '🐦‍⬛: DownloadComponent -> constructor -> this.data',
      this.file
    );
  }
}
