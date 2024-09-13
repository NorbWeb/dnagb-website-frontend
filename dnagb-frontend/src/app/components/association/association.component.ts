import { Component, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css',
})
export class AssociationComponent implements OnInit {
  data!: { board_speaker: any; who_we_are: string };
  url = environment.cmsUrl;

  constructor(private state: StateService) {}

  toggleCardFlip(e: HTMLElement) {
    // #### If only one card should flipable ####
    // let cards = document.getElementsByClassName('card');
    // for (const card of Array.from(cards)) {
    //   card.classList.remove('flip');
    // }

    e.classList.toggle('flip');
  }

  ngOnInit(): void {
    let boradSpeaker = this.state.getConf().association.board_speaker;
    let whoWeAre = this.state.getConf().association.who_we_are;
    console.log(boradSpeaker, whoWeAre);
    this.data = {
      board_speaker: boradSpeaker,
      who_we_are: whoWeAre.status === 'published' ? whoWeAre.who_we_are : '',
    };
  }
}
