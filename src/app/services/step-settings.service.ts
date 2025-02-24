import { Injectable } from '@angular/core';
import { Step } from '../models/step.enum';
import { BehaviorSubject } from 'rxjs';
import { StepConstants } from '../models/step.enum';

@Injectable({
  providedIn: 'root',
})
export class StepSettingsService {
  /**
   * The current step value stored in a BehaviorSubject.
   */
  private step$$ = new BehaviorSubject<Step>(StepConstants.UNITS);
  
  /**
   * The current step value exposed an observable.
   */
  step$ = this.step$$.asObservable();

  /**
   * A public method to set the current step value.
   * 
   * @param step The step value to set (1, 10, 100, 1000)
   */
  setStep(step: Step) {
    this.step$$.next(step);
  }
}
