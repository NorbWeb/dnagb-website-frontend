import { Component } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().association.history.status === 'published')
      this.data = this.state.getConf().association.history;
  }
}
