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
    events: [],
  });
  public readonly confState: Observable<any> = this._conf.asObservable();

  private _eventState: BehaviorSubject<any> = new BehaviorSubject<any>({
    event: {
      id: null,
      status: '',
      sort: null,
      user_created: '',
      date_created: '',
      user_updated: '',
      date_updated: '',
      description: '',
      date_start: '',
      date_end: null,
      location_name: '',
      title: '',
      announcement: null,
      type: [],
      city: '',
      street: '',
      number: '',
      postal_code: '',
    },
  });
  public readonly eventState: Observable<any> = this._eventState.asObservable();

  private _noteBox: BehaviorSubject<any> = new BehaviorSubject<any>({
    open: false,
  });
  public readonly noteBox: Observable<any> = this._noteBox.asObservable();

  private _sideNav: BehaviorSubject<any> = new BehaviorSubject<any>({
    open: false,
  });
  public readonly sideNav: Observable<any> = this._sideNav.asObservable();

  constructor() {}

  getConf(): any {
    return this._conf.getValue();
  }

  updateConf(newState: any) {
    this._conf.next(newState);
  }

  getSideNavState(): any {
    return this._sideNav.getValue();
  }

  updateSideNavState(newState: any) {
    this._sideNav.next(newState);
  }

  getEventState(): any {
    return this._eventState.getValue();
  }

  updateEventState(newState: any) {
    this._eventState.next(newState);
  }

  resetEventState(): any {
    this._eventState.next({
      event: {
        id: null,
        status: '',
        sort: null,
        user_created: '',
        date_created: '',
        user_updated: '',
        date_updated: '',
        description: '',
        date_start: '',
        date_end: null,
        location_name: '',
        title: '',
        announcement: null,
        type: [],
        city: '',
        street: '',
        number: '',
        postal_code: '',
      },
    });
  }

  getNoteBox(): any {
    return this._noteBox.getValue();
  }

  updateNoteBox(newState: any) {
    this._noteBox.next(newState);
  }
}
