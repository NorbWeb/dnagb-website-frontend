import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../0_global-services/state.service';
import { environment } from '../../../../environment/env';
import { CommonModule } from '@angular/common';
import { Staff } from '../../../1_types-and-interfaces/Staff';
import { StaffCardComponent } from '../../../components/staff-card/staff-card.component';

@Component({
    selector: 'app-association',
    imports: [CommonModule, StaffCardComponent],
    templateUrl: './association.component.html',
    styleUrl: './association.component.css'
})
export class AssociationComponent implements OnInit {
  data!: { board: Staff[]; speaker: Staff[]; who_we_are: string };
  url = environment.cmsUrl;

  constructor(private state: StateService) {}

  editBoardRawData(rawData: any) {
    if (rawData.status !== 'published') {
      return [];
    }

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
    let board = this.editBoardRawData(this.state.getConf().association.board);
    let speaker = this.state.getConf().association.speaker;
    let whoWeAre = this.state.getConf().association.who_we_are;
    this.data = {
      board: board,
      speaker: speaker,
      who_we_are: whoWeAre.status === 'published' ? whoWeAre.who_we_are : '',
    };
  }
}
