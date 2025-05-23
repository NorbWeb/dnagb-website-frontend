import { Component, inject, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '../../2_pipes/safeHtml';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-custom-html',
  imports: [SafeHtmlPipe],
  templateUrl: './custom-html.component.html',
  styleUrl: './custom-html.component.css',
})
export class CustomHtmlComponent implements OnInit {
  route = inject(ActivatedRoute);
  state = inject(StateService);
  unsubscribeAll = new Subject();

  data!: any;

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.data = res['html'];
        console.log(`🐦‍⬛: CustomHtmlComponent -> this.data`, res, this.data);

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
