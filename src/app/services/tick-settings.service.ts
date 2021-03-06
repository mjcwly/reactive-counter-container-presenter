import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TickDirection } from '../models/tick-direction.enum';
import { ITickSettings } from '../models/tick-settings.model';
import { TickSpeed, TickSpeedConstants } from '../models/tick-speed.enum';

@Injectable({
  providedIn: 'root',
})
export class TickSettingsService {
  private isTickingSubject$ = new BehaviorSubject<boolean>(false);
  isTicking$ = this.isTickingSubject$.asObservable();

  private tickSpeedSubject$ = new BehaviorSubject<TickSpeed>(
    TickSpeedConstants.FAST
  );
  tickSpeed$ = this.tickSpeedSubject$.asObservable();

  private tickDirectionSubject$ = new BehaviorSubject<TickDirection>(
    TickDirection.Up
  );
  tickDirection$ = this.tickDirectionSubject$.asObservable();

  tickSettings$: Observable<ITickSettings> = combineLatest([
    this.isTicking$,
    this.tickSpeed$,
    this.tickDirection$,
  ]).pipe(
    map(([isTicking, tickSpeed, tickDirection]) => {
      const tickSettings: ITickSettings = {
        isTicking,
        tickSpeed,
        tickDirection,
      };
      return tickSettings;
    })
  );

  setTickSettings(tickSettings: ITickSettings) {
    this.isTickingSubject$.next(tickSettings.isTicking);
    this.tickSpeedSubject$.next(tickSettings.tickSpeed);
    this.tickDirectionSubject$.next(tickSettings.tickDirection);
  }
}
