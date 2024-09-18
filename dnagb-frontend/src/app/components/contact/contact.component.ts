import { Component } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().legal.contact.status === 'published')
      this.data = this.state.getConf().legal.contact;
  }
}
