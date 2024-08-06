import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _settings: BehaviorSubject<any> = new BehaviorSubject<any>({
    appSettings: {
      title: {
        long_1: '',
        long_2: '',
        short: '',
      },
    },
  });
  public readonly massnahmenState: Observable<any> =
    this._settings.asObservable();

  constructor() {}

  getSettings(): any {
    return this._settings.getValue();
  }

  updateSettings(newState: any) {
    this._settings.next(newState);
  }
}
