import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageHeaderService {
  private mainPageTitle = new BehaviorSubject('Лёнькин кот');

  getPageTitle() {
    return this.mainPageTitle.asObservable();
  }

  setPageTitle(pageTitle: string) {
    this.mainPageTitle.next(pageTitle);
  }
}
