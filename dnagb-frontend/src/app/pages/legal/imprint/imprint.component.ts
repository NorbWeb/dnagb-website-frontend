import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css',
})
export class ImprintComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().legal.imprint.status === 'published')
      this.data = this.state.getConf().legal.imprint;
  }
}
