import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-box',
  standalone: true,
  imports: [],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.css',
})
export class NoteBoxComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  data!: NewsItem;
  constructor(private state: StateService, private router: Router) {}

  navigateToEvent() {
    this.router.navigateByUrl(`/news-details/${this.data.id}`);
  }

  ngOnInit(): void {
    this.data = this.state.getEventState().event;
    this.state.eventState.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.data = res.event;
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
