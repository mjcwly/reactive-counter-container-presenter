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
  @Input() inputTickSettings: ITickSettings;
  @Output() tickSettingsChangedEvent = new EventEmitter<ITickSettings>();

  stepConstants = StepConstants;
  tickSpeed = TickSpeedConstants;
  tickDirection = TickDirection;

  onIsTickingChanged(isTicking: boolean): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      isTicking,
    });
  }

  onTickSpeedChanged(tickSpeed: TickSpeed): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      tickSpeed,
    });
  }

  onTickDirectionChanged(tickDirection: TickDirection): void {
    this.tickSettingsChangedEvent.emit({
      ...this.inputTickSettings,
      tickDirection,
    });
  }
}
