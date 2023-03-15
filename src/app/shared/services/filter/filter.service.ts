import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  private hide = new Subject<boolean>();
  hide$ = this.hide.asObservable();

  emit(value: boolean) {
    this.hide.next(value);
  }
}
