import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
    selector: 'app-what-is',
    imports: [],
    templateUrl: './what-is.component.html',
    styleUrl: './what-is.component.css'
})
export class WhatIsComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().naginata.status === 'published')
      this.data = this.state.getConf().naginata.what_is;
  }
}
