import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step, StepConstants } from '../../models/step.enum';
import { TickDirection } from '../../models/tick-direction.enum';
import { ITickSettings } from '../../models/tick-settings.model';
import { TickSpeed, TickSpeedConstants } from '../../models/tick-speed.enum';

@Component({
    selector: 'tick-settings',
    templateUrl: './tick-settings.component.html',
    styleUrls: ['./tick-settings.component.css'],
    standalone: true
})
export class TickSettingsComponent {
  /**
   * The input tick settings object.
   */
  @Input() inputTickSettings: ITickSettings;

  /**
   * An event emitter that emits the updated tick settings object.
   */
  @Output() tickSettingsChangedEvent = new EventEmitter<ITickSettings>();

  /**
   * The step constants to be used in the template.
   */
  stepConstants = StepConstants;

  /**
   * The tick speed to be used in the template.
   */
  tickSpeed = TickSpeedConstants;

  /**
   * The tick direction enum to be used in the template.
   */
  tickDirection = TickDirection;

  /**
   * A handler function for when either of the "Start" or "Stop" buttons are clicked.
   * 
   * @param isTicking A boolean value of whether the counter is ticking or not. 
   */
  onIsTickingChanged(isTicking: boolean): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      isTicking,
    });
  }

  /**
   * A handler function for when the "Slow", "Medium", or "Fast" buttons are clicked.
   * 
   * @param tickSpeed The tick speed value (100, 500, or 1000 milliseconds). 
   */
  onTickSpeedChanged(tickSpeed: TickSpeed): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      tickSpeed,
    });
  }

  /**
   * A handler function for when the "Up" or "Down" buttons are clicked.
   * 
   * @param tickDirection The tick direction (up or down). 
   */
  onTickDirectionChanged(tickDirection: TickDirection): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      tickDirection,
    });
  }
}
