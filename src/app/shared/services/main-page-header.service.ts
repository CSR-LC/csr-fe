import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPageHeaderService {
  private mainPageTitle = new BehaviorSubject('Лёнькин кот');
  private pageTitleDisplayed = new BehaviorSubject(true);

  getPageTitle(): Observable<string> {
    return this.mainPageTitle.asObservable();
  }

  setPageTitle(pageTitle: string) {
    this.mainPageTitle.next(pageTitle);
  }

  getPageTitleDisplayed(): Observable<boolean> {
    return this.pageTitleDisplayed.asObservable();
  }

  setPageTitleDisplayed(isDisplayed: boolean) {
    this.pageTitleDisplayed.next(isDisplayed);
  }
}
