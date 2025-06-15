import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navData } from '../header/nav.data';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  private state = inject(StateService);
  unsubscribeAll = new Subject();
  open: boolean = false;
  protected navData = navData;

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
