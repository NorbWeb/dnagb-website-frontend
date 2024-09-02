import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../../0_global-services/state.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService
  ) {}

  ngOnInit(): void {
    // TODO Display component with data
  }
}
