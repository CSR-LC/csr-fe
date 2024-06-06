import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export type UserDetail = {
  label: string;
  text: string;
};

@Component({
  selector: 'lc-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  @Input() title!: string;
  @Input() details: UserDetail[] = [];
  @Output() edited = new EventEmitter<void>();

  edit() {
    this.edited.emit();
  }
}
