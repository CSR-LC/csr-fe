import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lc-text-like-input',
  templateUrl: './text-like-input.component.html',
  styleUrls: ['./text-like-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLikeInputComponent {
  @Input() label!: string;
  @Input() text!: string;
}
