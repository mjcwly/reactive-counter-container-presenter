import { Component, Input } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
    standalone: true
})
export class CounterComponent {
  /**
   * The counter value to display
   */
  @Input() counter: number;
}
