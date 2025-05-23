import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipe } from '../../2_pipes/safeHtml';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-custom-html',
  imports: [SafeHtmlPipe],
  templateUrl: './custom-html.component.html',
  styleUrl: './custom-html.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CustomHtmlComponent implements OnInit {
  route = inject(ActivatedRoute);
  state = inject(StateService);
  unsubscribeAll = new Subject();

  data!: any;

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        if (res['status'] === 'published') {
          this.data = res['html'];
        }

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
