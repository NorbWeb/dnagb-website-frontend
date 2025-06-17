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

    this.onWindowResize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let screenType = 'desktop_large';
    if (window.innerWidth <= 576) {
      screenType = 'mobile';
    }
    if (window.innerWidth > 576 && window.innerWidth <= 768) {
      screenType = 'tablet';
    }
    if (window.innerWidth > 768 && window.innerWidth <= 992) {
      screenType = 'tablet_landscape';
    }
    if (window.innerWidth > 992 && window.innerWidth <= 1200) {
      screenType = 'desktop';
    }
    if (window.innerWidth > 1200) {
      screenType = 'desktop_large';
    }

    this.state.updateWindowSize({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      size: screenType,
    });

    // console.log(`📢: size ->: ${this.state.getWindowSize().size}`);
  }
}
