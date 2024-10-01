import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoteBoxComponent } from './components/note-box/note-box.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StateService } from './0_global-services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
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
  constructor(private state: StateService) {}

  ngOnInit(): void {
    this.state.updateWindowSize({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
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
