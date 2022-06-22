import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  interval,
  map,
  merge,
  of,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TickSettingsService } from './tick-settings.service';
import { StepSettingsService } from './step-settings.service';
import { TickDirection } from '../models/tick-direction.enum';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private initialCounter$ = of(0);

  private counterSubject$ = new BehaviorSubject<number>(0);
  private counter$ = this.counterSubject$.asObservable();

  private manualSetSubject$ = new Subject<number>();
  private manualSet$ = this.manualSetSubject$.asObservable();

  private manualDecrementSubject$ = new Subject<void>();
  private manualDecrement$ = this.manualDecrementSubject$.asObservable().pipe(
    withLatestFrom(this.counter$, this.stepSettingsService.step$),
    map(([, counter, step]) => counter - step)
  );

  private manualIncrementSubject$ = new Subject<void>();
  private manualIncrement$ = this.manualIncrementSubject$.asObservable().pipe(
    withLatestFrom(this.counter$, this.stepSettingsService.step$),
    map(([, counter, step]) => counter + step)
  );

  private tickInterval$ = this.tickSettingsService.tickSpeed$.pipe(
    switchMap((tickSpeed) => interval(tickSpeed))
  );

  private tickIncrement$ = this.tickSettingsService.tickDirection$.pipe(
    switchMap((tickDirection) =>
      this.stepSettingsService.step$.pipe(
        map((step) => (tickDirection === TickDirection.Up ? step : -step))
      )
    )
  );

  private autoIncrementCounter$ = combineLatest([
    this.tickInterval$,
    this.tickSettingsService.isTicking$,
  ]).pipe(
    filter(([, isTicking]) => !!isTicking),
    withLatestFrom(this.counter$, this.tickIncrement$),
    map(([[], counter, tickIncrement]) => counter + tickIncrement)
  );

  displayCounter$ = merge(
    this.initialCounter$,
    this.manualSet$,
    this.manualDecrement$,
    this.manualIncrement$,
    this.autoIncrementCounter$
  ).pipe(tap((counter) => this.counterSubject$.next(counter)));

  constructor(
    private readonly tickSettingsService: TickSettingsService,
    private readonly stepSettingsService: StepSettingsService
  ) {}

  manualDecrement(): void {
    this.manualDecrementSubject$.next();
  }

  manualIncrement(): void {
    this.manualIncrementSubject$.next();
  }

  manualSet(counter: number): void {
    this.manualSetSubject$.next(counter);
  }
}
