import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoData } from '@app/shared/models';

@Component({
  selector: 'lc-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public infoData: InfoData) {}
}
