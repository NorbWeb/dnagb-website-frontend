import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { EventItem } from '../../1_types-and-interfaces/NewsItem';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../environment/env';

@Component({
  selector: 'app-note-box',
  imports: [CommonModule, DatePipe],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.css',
})
export class NoteBoxComponent implements OnInit, OnDestroy {
  state = inject(StateService);
  router = inject(Router);
  unsubscribeAll = new Subject();
  data!: EventItem | undefined;
  open: boolean = false;
  url = environment.cmsUrl;

  navigateToEvent() {
    this.router.navigateByUrl(`/event-details/${this.data?.id}`);
  }

  closeEventBox() {
    console.log('closeEventBox');
    this.state.updateNoteBox({ ...this.state.getNoteBox, open: false });
    this.state.updateEventState(undefined);
  }

  ngOnInit(): void {
    this.data = this.state.getEventState();
    this.state.eventState.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.data = res;
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
