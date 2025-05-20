import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
    selector: 'app-martial-art',
    imports: [],
    templateUrl: './martial-art.component.html',
    styleUrl: './martial-art.component.css'
})
export class MartialArtComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().naginata.status === 'published')
      this.data = this.state.getConf().naginata.martial_art;
  }
}
