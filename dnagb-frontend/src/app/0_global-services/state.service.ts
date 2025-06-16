import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventItem } from '../1_types-and-interfaces/NewsItem';
import { ScreenSizes } from '../1_types-and-interfaces/screenSizes';

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

  private _eventState = new BehaviorSubject<EventItem | undefined>(undefined);
  public readonly eventState: Observable<EventItem | undefined> =
    this._eventState.asObservable();

  private _noteBox: BehaviorSubject<any> = new BehaviorSubject<any>({
    open: false,
  });
  public readonly noteBox: Observable<any> = this._noteBox.asObservable();

  private _sideNav: BehaviorSubject<any> = new BehaviorSubject<any>({
    open: false,
  });
  public readonly sideNav: Observable<any> = this._sideNav.asObservable();

  private _windowSize: BehaviorSubject<ScreenSizes> =
    new BehaviorSubject<ScreenSizes>({
      screenWidth: undefined,
      screenHeight: undefined,
      size: 'desktop', // default size
    });
  public readonly windowSize: Observable<any> = this._windowSize.asObservable();

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

  getWindowSize(): any {
    return this._windowSize.getValue();
  }

  updateWindowSize(newState: any) {
    this._windowSize.next(newState);
  }

  getEventState(): EventItem | undefined {
    return this._eventState.getValue();
  }

  updateEventState(newState: EventItem | undefined) {
    this._eventState.next(newState);
  }

  // resetEventState(): void {
  //   this._eventState.next({
  //     id: 0,
  //     status: '',
  //     image: '',
  //     past: false,
  //     description: '',
  //     date_start: new Date(),
  //     date_end: null,
  //     location_name: '',
  //     title: '',
  //     announcement: '',
  //     type: [],
  //     city: '',
  //     street: '',
  //     number: '',
  //     postal_code: '',
  //   });
  // }

  getNoteBox(): any {
    return this._noteBox.getValue();
  }

  updateNoteBox(newState: any) {
    this._noteBox.next(newState);
  }
}
