import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lc-confirmed-email-modal',
  templateUrl: './confirmed-email-modal.component.html',
  styleUrls: ['./confirmed-email-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmedEmailModalComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<ConfirmedEmailModalComponent>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.matDialogRef.close();
    }, 5000);
  }
}
