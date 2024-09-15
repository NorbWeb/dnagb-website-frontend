import { Component, OnInit } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { CommonModule } from '@angular/common';
import { StaffCardComponent } from '../staff-card/staff-card.component';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [CommonModule, StaffCardComponent],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css',
})
export class AssociationComponent implements OnInit {
  data!: { board: any; board_speaker: any; who_we_are: string };
  url = environment.cmsUrl;

  constructor(private state: StateService) {}

  editBoardRawData(rawData: any) {
    function stringToArray(string: string) {
      let label: any = {};
      let arr = string.split(',');
      for (const item of arr) {
        let splitItem: any = item.split(':');
        let key = splitItem[0];
        let value = splitItem[1];
        label[key] = value;
      }
      return label;
    }

    if (rawData.status !== 'published') {
      return [];
    }

    let result = [
      {
        name: rawData.president_name,
        rank: rawData.president_rank,
        label: stringToArray(rawData.president_label)[rawData.president_sex],
        email: rawData.president_email,
        image: rawData.president_image,
      },
      {
        name: rawData.vice_name,
        rank: rawData.vice_rank,
        label: stringToArray(rawData.vice_label)[rawData.vice_sex],
        email: rawData.vice_email,
        image: rawData.vice_image,
      },
      {
        name: rawData.treasurer_name,
        rank: rawData.treasurer_rank,
        label: stringToArray(rawData.treasurer_label)[rawData.treasurer_sex],
        email: rawData.treasurer_email,
        image: rawData.treasurer_image,
      },
    ];

    return result;
  }

  ngOnInit(): void {
    let boradSpeaker = this.state.getConf().association.board_speaker;
    let board = this.editBoardRawData(this.state.getConf().association.board);
    let whoWeAre = this.state.getConf().association.who_we_are;
    this.data = {
      board: board,
      board_speaker: boradSpeaker,
      who_we_are: whoWeAre.status === 'published' ? whoWeAre.who_we_are : '',
    };
    console.log(
      '🐦‍⬛: AssociationComponent -> constructor -> this.data',
      this.data
    );
  }
}
