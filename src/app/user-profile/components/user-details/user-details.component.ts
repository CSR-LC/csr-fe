import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() clicked = new EventEmitter<void>();
}
