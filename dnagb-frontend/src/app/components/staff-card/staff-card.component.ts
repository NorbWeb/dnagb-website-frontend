import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environment/env';
import { CommonModule } from '@angular/common';
import { Staff } from '../../1_types-and-interfaces/Staff';

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.css',
})
export class StaffCardComponent implements OnInit {
  @Input() item!: Staff;
  url = environment.cmsUrl;

  toggleCardFlip(e: HTMLElement) {
    // #### If only one card should flipable ####
    // __________________________________________
    // let cards = document.getElementsByClassName('card');
    // for (const card of Array.from(cards)) {
    //   card.classList.remove('flip');
    // }

    e.classList.toggle('flip');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngOnInit(): void {}
}
