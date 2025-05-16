import { Component, OnInit, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { navData } from './nav.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  url = environment.cmsUrl;
  logo!: string;
  navData = navData;
  subNavElements = viewChildren<any>('dropdown');

  constructor(private state: StateService) {}

  closeSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: false });
  }

  toggleSideNav() {
    let state = this.state.getSideNavState().open;
    this.state.updateSideNavState({ ...state, open: !state });
  }

  closeDropdown(e: any) {
    e.stopPropagation();
    for (const element of this.subNavElements()) {
      element.nativeElement.classList.remove('open');
    }
  }

  openDropdown(ref: any, e: any) {
    this.closeDropdown(e);
    ref.classList.add('open');
  }

  ngOnInit(): void {
    this.logo = this.state.getConf().appSettings.logo;
  }
}
