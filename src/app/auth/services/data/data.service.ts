import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<string>('');
  public data$ = this.dataSubject.asObservable(); 

  constructor() { }

  updateData(data: string) {
    this.dataSubject.next(data);
  }
}
