import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step, StepConstants } from '../../models/step.enum';

@Component({
    selector: 'step-selection',
    templateUrl: './step-selection.component.html',
    styleUrls: ['./step-selection.component.css'],
    standalone: true
})
export class StepSelectionComponent {
  @Input() selectedStep: Step;
  @Output() stepSelectedEvent = new EventEmitter<Step>();

  stepConstants = StepConstants;

  onStepChanged(step: Step): void {
    this.stepSelectedEvent.emit(step);
  }
}
