import { Component, EventEmitter, Output } from '@angular/core';
import { Step } from '../../models/step.enum';

@Component({
    selector: 'manual-controls',
    templateUrl: './manual-controls.component.html',
    styleUrls: ['./manual-controls.component.css'],
    standalone: true
})
export class ManualControlsComponent {
  /**
   * An event emitter to notify parent components when the "Decrement" button is clicked. 
   */
  @Output() decrementEvent = new EventEmitter<void>();

  /**
   * An event emitter to notify parent components when the "Increment" button is clicked.
   */
  @Output() incrementEvent = new EventEmitter<void>();

  /**
   * An event emitter to notify parent components when the "Reset" button is clicked.
   */
  @Output() resetEvent = new EventEmitter<void>();

  /**
   * A handler function for when the "Decrement" button is clicked.
   */
  onDecrementClicked(): void {
    this.decrementEvent.emit();
  }

  /**
   * A handler function for when the "Increment" button is clicked.
   */
  onIncrementClicked(): void {
    this.incrementEvent.emit();
  }

  /**
   * A handler function for when the "Reset" button is clicked.
   */
  onResetClicked(): void {
    this.resetEvent.emit();
  }
}
