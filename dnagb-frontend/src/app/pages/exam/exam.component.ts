import { Component } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  data!: any;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    if (this.state.getConf().info.examination.status === 'published')
      this.data = this.state.getConf().info.examination;
  }
}
