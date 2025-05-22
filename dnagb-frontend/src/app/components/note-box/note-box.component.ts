import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { EventItem } from '../../1_types-and-interfaces/NewsItem';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/env';

@Component({
  selector: 'app-note-box',
  imports: [CommonModule],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.css',
})
export class NoteBoxComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  data!: EventItem;
  open: boolean = false;
  url = environment.cmsUrl;

  constructor(private state: StateService, private router: Router) {}

  navigateToEvent() {
    this.router.navigateByUrl(`/event-details/${this.data.id}`);
  }

  closeEventBox() {
    console.log('closeEventBox');
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
