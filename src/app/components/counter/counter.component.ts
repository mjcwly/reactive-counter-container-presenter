import { Component, Input } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
    standalone: false
})
export class CounterComponent {
  @Input() counter: number;
}
