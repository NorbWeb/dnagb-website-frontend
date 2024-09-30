import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';

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

  constructor(private state: StateService) {}

  closeSideNav() {
    let state = this.state.getSideNavState();
    this.state.updateSideNavState({ ...state, open: false });
  }

  toggleSideNav() {
    let state = this.state.getSideNavState().open;
    this.state.updateSideNavState({ ...state, open: !state });
  }

  ngOnInit(): void {
    this.logo = this.state.getConf().appSettings.logo;
  }
}
