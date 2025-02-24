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
import { TickSpeed } from '../models/tick-speed.enum';
import { Step } from '../models/step.enum';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  /**
   * An observable that emits the initial counter value of 0.
   */
  private initialCounter$ = of(0);

  /**
   * The current counter value stored in a BehaviorSubject.
   */
  private counter$$ = new BehaviorSubject<number>(0);

  /**
   * An action stream for setting the counter value manually.
   */
  private manualSet$$ = new Subject<number>();

  /**
   * A subject to trigger the action stream for manually decrementing the counter. 
   */
  private manualDecrement$$ = new Subject<void>();

  /**
   * An action stream for manually decrementing the counter value.
   */
  private manualDecrement$ = this.manualDecrement$$.asObservable().pipe(
    withLatestFrom(this.counter$$, this.stepSettingsService.step$),
    map(([_, counter, step]: [void, number, Step]) => {
      return counter - step;
    })
  );

  /**
   * A subject to trigger the action stream for manually incrementing the counter.
   */
  private manualIncrement$$ = new Subject<void>();

  /**
   * An action stream for manually incrementing the counter value.
   */
  private manualIncrement$ = this.manualIncrement$$.asObservable().pipe(
    withLatestFrom(this.counter$$, this.stepSettingsService.step$),
    map(([_, counter, step]: [void, number, Step]) => {
      return counter + step;
    })
  );

  /**
   * The tick interval to automatically increment or decrement the counter value.
   */
  private tickInterval$ = this.tickSettingsService.tickSpeed$.pipe(
    switchMap((tickSpeed: TickSpeed) => {
      return interval(tickSpeed);
    })
  );

  /**
   * The tick step to increment or decrement the counter value.
   */
  private tickStep$ = this.tickSettingsService.tickDirection$.pipe(
    switchMap((tickDirection) =>
      this.stepSettingsService.step$.pipe(
        map((step: Step) => {
          return (tickDirection === TickDirection.Up ? step : -step);
        })
      )
    )
  );

  /**
   * An action stream for automatically incrementing the counter value 
   * by the tick step value at the tick speed interval.
   */
  private autoCounter$ = combineLatest([
    this.tickInterval$,
    this.tickSettingsService.isTicking$
  ]).pipe(
    filter(([, isTicking]) => !!isTicking),
    withLatestFrom(this.counter$$, this.tickStep$),
    map(([[], counter, tickStep]: [[number, boolean], number, number]) => {
      const autoCounter = (counter + tickStep);
      return autoCounter;
    })
  );

  /**
   * The output stream for the counter value to display.
   */
  displayCounter$ = merge(
    this.initialCounter$,
    this.manualSet$$,
    this.manualDecrement$,
    this.manualIncrement$,
    this.autoCounter$
  ).pipe(tap((counter: number) => {
    // Store the counter value in the BehaviorSubject (read in future emissions) 
    this.counter$$.next(counter)
  }));

  /**
   * Constructor
   * 
   * @param tickSettingsService The tick settings service to store and manage the tick settings.
   *  
   * @param stepSettingsService The step settings service to store and manage the step settings.
   */
  constructor(
    private readonly tickSettingsService: TickSettingsService,
    private readonly stepSettingsService: StepSettingsService
  ) { }

  /**
   * A public function to manually decrement the counter value.
   */
  manualDecrement(): void {
    this.manualDecrement$$.next();
  }

  /**
   * A public function to manually increment the counter value.
   */
  manualIncrement(): void {
    this.manualIncrement$$.next();
  }

  /**
   * A public method to manually set the counter value to a custom value.
   * 
   * @param counter // The custom counter value to set. 
   */
  manualSet(counter: number): void {
    this.manualSet$$.next(counter);
  }
}
