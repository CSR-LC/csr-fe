import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lc-user-blocked-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './user-blocked-modal-content.component.html',
  styleUrl: './user-blocked-modal-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBlockedModalContentComponent {}
