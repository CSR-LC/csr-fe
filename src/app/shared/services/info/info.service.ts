import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        switchMap((buttonValue: boolean | undefined) => {
          return typeof buttonValue === 'boolean' ? of(buttonValue) : of(null);
        }),
      );
  }
}
