import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TickDirection } from '../models/tick-direction.enum';
import { ITickSettings } from '../models/tick-settings.model';
import { TickSpeed, TickSpeedConstants } from '../models/tick-speed.enum';

@Injectable({
  providedIn: 'root',
})
export class TickSettingsService {
  /**
   * The boolean value of whether the counter is ticking or not 
   * stored in a BehaviorSubject.
   */
  private isTicking$$ = new BehaviorSubject<boolean>(false);
  
  /**
   * The boolean value of whether the counter is ticking or not
   * exposed as an observable.
   */
  isTicking$ = this.isTicking$$.asObservable();

  /**
   * The tick speed value stored in a BehaviorSubject. 
   */
  private tickSpeed$$ = new BehaviorSubject<TickSpeed>(
    TickSpeedConstants.FAST
  );

  /**
   * The tick speed value exposed as an observable.
   */
  tickSpeed$ = this.tickSpeed$$.asObservable();

  /**
   * The tick directiom stored in a BehaviorSubject.
   */
  private tickDirection$$ = new BehaviorSubject<TickDirection>(
    TickDirection.Up
  );

  /**
   * The tick direction exposed as an observable.
   */
  tickDirection$ = this.tickDirection$$.asObservable();

  /**
   * An observable that emits the all tick settings as a single object.
   */
  tickSettings$: Observable<ITickSettings> = combineLatest([
    this.isTicking$,
    this.tickSpeed$,
    this.tickDirection$,
  ]).pipe(
    map(([isTicking, tickSpeed, tickDirection]: [boolean, TickSpeed, TickDirection]) => {
      const tickSettings: ITickSettings = { isTicking, tickSpeed, tickDirection };
      return tickSettings;
    })
  );

  /**
   * A public method to set the current tick settings.
   * 
   * @param tickSettings The tick settings to set. 
   */
  setTickSettings(tickSettings: ITickSettings) {
    this.isTicking$$.next(tickSettings.isTicking);
    this.tickSpeed$$.next(tickSettings.tickSpeed);
    this.tickDirection$$.next(tickSettings.tickDirection);
  }
}
