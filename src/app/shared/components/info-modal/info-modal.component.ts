import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoData } from '@app/shared/models';

@Component({
  selector: 'lc-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  infoData = inject<InfoData>(MAT_DIALOG_DATA);
}
