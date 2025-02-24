import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Step } from './models/step.enum';
import { ITickSettings } from './models/tick-settings.model';
import { TickSettingsService } from './services/tick-settings.service';
import { StepSettingsService } from './services/step-settings.service';
import { CounterService } from './services/counter.service';
import { StepSelectionComponent } from './components/step-selection/step-selection.component';
import { CounterComponent } from './components/counter/counter.component';
import { ManualControlsComponent } from './components/manual-controls/manual-controls.component';
import { TickSettingsComponent } from './components/tick-settings/tick-settings.component';
import { CommonModule } from '@angular/common';

/**
 * An interface to define the structure of the view model for the app component.
 */
export interface IAppViewModel {
  /**
   * The current counter value.
   */
  counter: number;

  /**
   * The current step value (Amount to increment/decrement the counter by).
   */
  step: Step;

  /**
   * The current tick settings.
   */
  tickSettings: ITickSettings;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    StepSelectionComponent,
    CounterComponent,
    ManualControlsComponent,
    TickSettingsComponent
  ]
})
export class AppComponent {
  /**
   * An observable that emits the view model for the app component.
   * - We subscribe to this in the template using the async pipe.
   */
  vm$: Observable<IAppViewModel> = combineLatest([
    this.counterService.displayCounter$,
    this.stepSettingsService.step$,
    this.tickSettingsService.tickSettings$,
  ]).pipe(
    map(([counter, step, tickSettings]) => ({
      counter, step, tickSettings
    }))
  );

  /**
   * Constructor
   * 
   * @param counterService The counter service to store and manage the counter value.
   *  
   * @param tickSettingsService The tick settings service to store and manage the tick settings.
   * 
   * @param stepSettingsService The step settings service to store and manage the step settings.
   */
  constructor(
    private readonly counterService: CounterService,
    private readonly tickSettingsService: TickSettingsService,
    private readonly stepSettingsService: StepSettingsService
  ) { }

  /**
   * A handler function for the StepSelectionComponent's (stepSelected) event.
   * 
   * @param step // The selected step value (a number restricted to 1, 10, 100, or 1000).
   */
  stepSelectedHandler(step: Step) {
    this.stepSettingsService.setStep(step);
  }

  /**
   * A handler function for the ManualControlsComponent's (manualDecrement) event.
   * - Triggered when the user clicks the "Decrement" button.
   */
  manualDecrementHandler(): void {
    this.counterService.manualDecrement();
  }

  /**
   * A handler function for the ManualControlsComponent's (manualIncrement) event.
   * - Triggered when the user clicks the "Increment" button.
   */
  manualIncrementHandler(): void {
    this.counterService.manualIncrement();
  }

  /**
   * A handler function for the ManualControlsComponent's (manualSet) event.
   * - Currently only being triggered when the user clicks the "Reset" button.
   * 
   * @param counter // The counter value to set manually (0 when "Reset" is clicked).
   */
  manualSetHandler(counter: number): void {
    this.counterService.manualSet(counter);
  }

  /**
   * A handler function for the TickSettingsComponent's (tickSettingsChanged) event.
   * - Triggered when the user changes any of the tick settings (start/stop, speed, direction).
   * 
   * @param tickSettings The new tick settings to set in the tick settings service.
   */
  tickSettingsChangedHandler(tickSettings: ITickSettings): void {
    this.tickSettingsService.setTickSettings(tickSettings);
  }
}
