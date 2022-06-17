import { Injectable } from '@angular/core';
import { Step } from '../models/step.enum';
import { BehaviorSubject } from 'rxjs';
import { StepConstants } from '../models/step.enum';

@Injectable({
  providedIn: 'root',
})
export class StepSettingsService {
  private stepSubject$ = new BehaviorSubject<Step>(StepConstants.UNITS);
  step$ = this.stepSubject$.asObservable();

  setStep(step: Step) {
    this.stepSubject$.next(step);
  }
}
