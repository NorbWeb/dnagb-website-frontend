import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { NewsItem } from '../../1_types-and-interfaces/NewsItem';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.css',
})
export class NoteBoxComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  data!: NewsItem;
  open: boolean = false;

  constructor(private state: StateService, private router: Router) {}

  navigateToEvent() {
    this.router.navigateByUrl(`/news-details/${this.data.id}`);
  }

  closeEventBox() {
    this.state.updateNoteBox({ ...this.state.getNoteBox, open: false });
  }

  ngOnInit(): void {
    this.data = this.state.getEventState().event;
    this.state.eventState.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.data = res.event;
      },
    });
    this.state.noteBox.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.open = res.open;
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
