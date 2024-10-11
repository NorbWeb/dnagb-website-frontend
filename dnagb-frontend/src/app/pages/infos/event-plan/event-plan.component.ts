import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
  selector: 'app-event-plan',
  standalone: true,
  imports: [],
  templateUrl: './event-plan.component.html',
  styleUrl: './event-plan.component.css',
})
export class EventPlanComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().info.planing.status === 'published')
      this.data = this.state.getConf().info.planing;
  }
}
