import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@app/auth/models';
import { Store } from '@ngxs/store';

@Component({
  selector: 'lc-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfirmationComponent implements OnInit {
  constructor(private readonly store: Store) {}
  user?: User;

  ngOnInit() {
    this.user = this.store.snapshot().auth?.user;
  }

  resedMailConfirmation() {
    // console.log('resend c');
  }
}
