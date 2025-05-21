import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoteBoxComponent } from './components/note-box/note-box.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StateService } from './0_global-services/state.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NoteBoxComponent,
    SideNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private state = inject(StateService);

  ngOnInit(): void {
    this.state.updateWindowSize({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.state.updateWindowSize({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }
}
