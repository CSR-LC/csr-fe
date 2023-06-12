import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '@app/shared/components/info-modal/info-modal.component';
import { InfoData } from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private readonly dialog: MatDialog) {}

  openInfoModal(infoData: InfoData) {
    this.dialog.open(InfoModalComponent, {
      data: infoData,
      width: '390px',
      maxWidth: '390px',
      autoFocus: false,
      position: { bottom: '0px' },
    });
  }
}
