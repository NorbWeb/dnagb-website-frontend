import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
    selector: 'app-handy-stuff',
    imports: [],
    templateUrl: './handy-stuff.component.html',
    styleUrl: './handy-stuff.component.css'
})
export class HandyStuffComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().info.useful.status === 'published')
      this.data = this.state.getConf().info.useful;
  }
}
