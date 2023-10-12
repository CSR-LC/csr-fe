import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lc-fake-input',
  templateUrl: './fake-input.component.html',
  styleUrls: ['./fake-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeInputComponent {
  @Input() label!: string;
  @Input() text!: string | number;
}
