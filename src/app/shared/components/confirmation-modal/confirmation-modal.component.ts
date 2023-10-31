import { ChangeDetectionStrategy, Component, Inject, OnInit, Type } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModalData } from '@shared/models';

@Component({
  selector: 'lc-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent implements OnInit {
  title = '';
  body?: string;
  contentComponent: Type<any> | null = null;
  contentComponentData?: Record<string, unknown>;
  applyButtonText?: string;
  cancelButtonText?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public confirmationModalData: ConfirmationModalData) {}

  ngOnInit() {
    this.title = this.confirmationModalData.title;
    this.body = this.confirmationModalData.body;
    this.contentComponent = this.confirmationModalData.contentComponent || null;
    this.contentComponentData = this.confirmationModalData.contentComponentData;
    this.applyButtonText = this.confirmationModalData.applyButtonText;
    this.cancelButtonText = this.confirmationModalData.cancelButtonText;
  }
}
