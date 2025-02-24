import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
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

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports:[
      CommonModule,
      StepSelectionComponent,
      CounterComponent,
      ManualControlsComponent,
      TickSettingsComponent
    ]
})
export class AppComponent {
  vm$ = combineLatest([
    this.counterService.displayCounter$,
    this.stepSettingsService.step$,
    this.tickSettingsService.tickSettings$,
  ]).pipe(
    map(([counter, step, tickSettings]) => ({
      counter,
      step,
      tickSettings,
    }))
  );

  constructor(
    private readonly counterService: CounterService,
    private readonly tickSettingsService: TickSettingsService,
    private readonly stepSettingsService: StepSettingsService
  ) {}

  stepSelectedHandler(step: Step) {
    this.stepSettingsService.setStep(step);
  }

  manualDecrementHandler(): void {
    this.counterService.manualDecrement();
  }

  manualIncrementHandler(): void {
    this.counterService.manualIncrement();
  }

  manualSetHandler(counter: number): void {
    this.counterService.manualSet(counter);
  }

  tickSettingsChangedHandler(tickSettings: ITickSettings): void {
    this.tickSettingsService.setTickSettings(tickSettings);
  }
}
