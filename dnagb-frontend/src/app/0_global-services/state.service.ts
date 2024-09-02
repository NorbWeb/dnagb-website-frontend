import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _conf: BehaviorSubject<any> = new BehaviorSubject<any>({
    appSettings: {
      title: {
        long_1: '',
        long_2: '',
        short: '',
      },
    },
    news: [],
  });
  public readonly massnahmenState: Observable<any> = this._conf.asObservable();

  constructor() {}

  getConf(): any {
    return this._conf.getValue();
  }

  updateConf(newState: any) {
    this._conf.next(newState);
  }
}
