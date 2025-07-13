import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';

import { Speaker, Staff } from '../../1_types-and-interfaces/Staff';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-association',
  imports: [],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css',
})
export class AssociationComponent {
  protected state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();
  data!: { board: Staff[]; speaker: Speaker[]; who_we_are: string };
  url = environment.cmsUrl;

  editBoardRawData(rawData: any) {
    let result = [
      {
        name: rawData.president_name,
        rank: rawData.president_rank,
        role: rawData.president_role,
        email: rawData.president_email,
        image: rawData.president_image,
        status: 'published',
        open: false,
      },
      {
        name: rawData.vice_name,
        rank: rawData.vice_rank,
        role: rawData.vice_role,
        email: rawData.vice_email,
        image: rawData.vice_image,
        status: 'published',
        open: false,
      },
      {
        name: rawData.treasurer_name,
        rank: rawData.treasurer_rank,
        role: rawData.treasurer_role,
        email: rawData.treasurer_email,
        image: rawData.treasurer_image,
        status: 'published',
        open: false,
      },
    ];

    return result;
  }

  ngOnInit(): void {
    let board = this.editBoardRawData(
      this.state.getConf().association.board.translations[0]
    );
    let speaker = this.state.getConf().association.speaker;
    let whoWeAre = this.state.getConf().association.who_we_are;
    this.data = {
      board: board,
      speaker: speaker,
      who_we_are:
        whoWeAre.status === 'published' ? whoWeAre.translations[0].text : '',
    };

    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.titleService.setTitle(
          res['title'] + ` · ${this.state.getConf().appSettings.title.short}`
        );
        if (!res) {
          return;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
