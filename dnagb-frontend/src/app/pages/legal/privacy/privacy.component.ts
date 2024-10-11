import { Component } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().legal.privacy.status === 'published')
      this.data = this.state.getConf().legal.privacy;
  }
}
