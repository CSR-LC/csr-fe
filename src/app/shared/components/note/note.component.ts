import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotificationTypes } from '@shared/constants/notification.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lc-note',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  @Input() type!: NotificationTypes;
}
