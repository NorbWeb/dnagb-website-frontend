import { Component, inject } from '@angular/core';
import { StateService } from '../../0_global-services/state.service';
import { Board } from '../../1_types-and-interfaces/board';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-imprint',
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css',
})
export class ImprintComponent {
  protected state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  data!: any;
  repre!: Board;

  createRepreBlock(repre: any) {
    let block = document.createElement('p');
    let br = document.createElement('br');

    let headline = document.createElement('strong');
    headline.innerText = 'Vertreten durch:';
    headline.appendChild(br.cloneNode(true));
    block.appendChild(headline);

    let president = document.createElement('span');
    president.innerText = `${repre.president_role}: ${repre.president_name}`;
    president.appendChild(br.cloneNode(true));
    block.appendChild(president);

    let vice = document.createElement('span');
    vice.innerText = `${repre.vice_role}: ${repre.vice_name}`;
    vice.appendChild(br.cloneNode(true));
    block.appendChild(vice);

    let treasurer = document.createElement('span');
    treasurer.innerText = `${repre.treasurer_role}: ${repre.treasurer_name}`;
    block.appendChild(treasurer);

    return block;
  }

  ngOnInit(): void {
    if (this.state.getConf().imprint.status === 'published') {
      this.data = this.state.getConf().imprint;
      console.log(`🐦‍⬛: ImprintComponent -> this.data`, this.data);
    }
    if (this.state.getConf().association.board.status === 'published') {
      this.repre = this.state.getConf().association.board;
      this.createRepreBlock(this.repre);
    }

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

  ngAfterViewInit(): void {
    let target = document.getElementsByTagName('h3')[0];
    target.insertAdjacentElement(
      'beforebegin',
      this.createRepreBlock(this.repre)
    );
    console.log(`🐦‍⬛: ImprintComponent -> target`, target);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
