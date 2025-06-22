import { Component, inject, signal } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { headerNavData } from '../header/header.nav.data';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  private state = inject(StateService);
  protected router = inject(Router);
  unsubscribeAll = new Subject();
  protected open = signal<boolean>(false);
  protected headerNavData = headerNavData;

  clickBackdrop() {
    this.closeSideNav();
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  openSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: true });
  }

  closeSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: false });
  }

  ngOnInit(): void {
    this.state.sideNav.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res: any) => {
        this.open.set(res.open);
      },
    });
    this.router.events.pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.closeSideNav();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
