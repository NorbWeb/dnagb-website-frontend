import { Component, inject, signal } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { headerNavData } from '../header/header.nav.data';
import { footerNavData } from '../footer/footer.nav.data';

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
  protected footerNavData = footerNavData;

  toggleSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: !state });
  }

  navigateToRoute(url: string) {
    this.toggleSideNav();
    this.router.navigateByUrl(url);
  }

  ngOnInit(): void {
    this.state.sideNav.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res: any) => {
        this.open.set(res.open);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
