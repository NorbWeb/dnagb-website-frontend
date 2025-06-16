import { Component, inject, signal, viewChildren } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { navData } from './nav.data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  state = inject(StateService);
  router = inject(Router);
  unsubscribeAll = new Subject();
  url = environment.cmsUrl;
  logo!: string;
  protected navData = navData;
  protected showSideNav = signal<boolean>(false);
  subNavElements = viewChildren<any>('dropdown');

  closeSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: false });
  }

  toggleSideNav() {
    let state = this.state.getSideNavState().open;
    this.state.updateSideNavState({ ...state, open: !state });
  }

  closeDropdown(ref: any, e: any) {
    e.stopPropagation();
    for (const element of this.subNavElements()) {
      if (element.nativeElement !== ref) {
        element.nativeElement.classList.remove('open');
      }
    }
  }

  openDropdown(ref: any, e: any) {
    this.closeDropdown(ref, e);
    if (ref.classList.contains('open')) {
      ref.classList.remove('open');
    } else {
      ref.classList.add('open');
    }
  }

  windowClicked(remove: boolean = false) {
    document.addEventListener('click', (e) => {
      e.stopPropagation();
      for (const element of this.subNavElements()) {
        if (element !== e.target) {
          element.nativeElement.classList.remove('open');
        }
      }
    });

    if (remove) {
      window.removeEventListener('click', (e) => {});
    }
  }

  ngOnInit(): void {
    this.logo = this.state.getConf().appSettings.logo;
    this.windowClicked();

    this.state.windowSize.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        if (
          res.size === 'mobile' ||
          res.size === 'tablet' ||
          res.size === 'tablet_landscape'
        ) {
          this.showSideNav.set(true);
        } else {
          this.showSideNav.set(false);
        }

        if (!res) {
          return;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.windowClicked(true);
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
