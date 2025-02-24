import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step, StepConstants } from '../../models/step.enum';

@Component({
    selector: 'step-selection',
    templateUrl: './step-selection.component.html',
    styleUrls: ['./step-selection.component.css'],
    standalone: true
})
export class StepSelectionComponent {
  /**
   * The currently selected step value.
   */
  @Input() selectedStep: Step;

  /**
   * An event emitter to emit a newly selected step value. 
   */
  @Output() stepSelectedEvent = new EventEmitter<Step>();

  /**
   * The step constants enum to use in the template.
   */
  stepConstants = StepConstants;

  /**
   * A handler function for when the step value is changed.
   * 
   * @param step The newly selected step value. 
   */
  onStepChanged(step: Step): void {
    this.stepSelectedEvent.emit(step);
  }
}
