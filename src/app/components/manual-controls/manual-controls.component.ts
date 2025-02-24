import { Component, EventEmitter, Output } from '@angular/core';
import { Step } from '../../models/step.enum';

@Component({
    selector: 'manual-controls',
    templateUrl: './manual-controls.component.html',
    styleUrls: ['./manual-controls.component.css'],
    standalone: true
})
export class ManualControlsComponent {
  @Output() decrementEvent = new EventEmitter<void>();
  @Output() incrementEvent = new EventEmitter<void>();
  @Output() resetEvent = new EventEmitter<void>();

  onDecrementClicked(): void {
    this.decrementEvent.emit();
  }

  onIncrementClicked(): void {
    this.incrementEvent.emit();
  }

  onResetClicked(): void {
    this.resetEvent.emit();
  }
}
