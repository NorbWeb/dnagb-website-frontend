import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';

@Component({
  selector: 'app-note-box',
  standalone: true,
  imports: [],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.css',
})
export class NoteBoxComponent implements OnInit {
  @Input() id!: Number;
  data!: NewsItem;
  constructor(private state: StateService) {}

  ngOnInit(): void {
    this.data = this.state
      .getConf()
      .events.find((f: { id: Number }) => Number(f.id) === Number(this.id));
  }
}
