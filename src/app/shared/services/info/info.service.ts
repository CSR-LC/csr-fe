import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { InfoModalComponent } from '@app/shared/components/info-modal/info-modal.component';
import { InfoData } from '@app/shared/models';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private readonly dialog: MatDialog) {}

  openInfoModal(infoData: InfoData): Observable<boolean | null> {
    return this.dialog
      .open(InfoModalComponent, {
        data: infoData,
        width: '390px',
        maxWidth: '390px',
        autoFocus: false,
        position: { bottom: '0px' },
      })
      .afterClosed()
      .pipe(
        switchMap((buttonValue: boolean | undefined) => {
          return typeof buttonValue === 'boolean' ? of(buttonValue) : of(null);
        }),
      );
  }
}
