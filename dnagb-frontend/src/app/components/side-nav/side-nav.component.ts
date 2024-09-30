import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  open: boolean = false;

  constructor(private state: StateService) {}

  toggleSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: !state });
  }

  ngOnInit(): void {
    this.state.sideNav.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res: any) => {
        this.open = res.open;
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
