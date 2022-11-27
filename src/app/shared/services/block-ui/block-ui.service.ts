import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlockUi } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class BlockUiService {
  private readonly blockUi$ = new Subject<BlockUi>();

  get stream(): Observable<BlockUi> {
    return this.blockUi$ as Observable<BlockUi>;
  }

  block(): void {
    this.blockUi$.next(BlockUi.block);
  }

  unBlock(): void {
    this.blockUi$.next(BlockUi.unblock);
  }
}
