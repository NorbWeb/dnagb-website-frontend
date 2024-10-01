import { Component, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css',
})
export class MembershipComponent implements OnInit {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().association.membership.status === 'published')
      this.data = this.state.getConf().association.membership;
  }
}
