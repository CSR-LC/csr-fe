import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPageHeaderService {
  private mainPageTitle = new BehaviorSubject('Лёнькин кот');
  private filtersButtonDisplayed = new Subject<boolean>();
  private filtersButtonToggled = new Subject<boolean>();

  getPageTitle(): Observable<string> {
    return this.mainPageTitle.asObservable();
  }

  setPageTitle(pageTitle: string) {
    this.mainPageTitle.next(pageTitle);
  }

  getFiltersButtonDisplayed(): Observable<boolean> {
    return this.filtersButtonDisplayed.asObservable();
  }

  setFiltersButtonDisplayed(value: boolean): void {
    this.filtersButtonDisplayed.next(value);
  }

  getFiltersButtonToggled(): Observable<boolean> {
    return this.filtersButtonToggled.asObservable();
  }

  setFiltersButtonToggled(value: boolean): void {
    this.filtersButtonToggled.next(value);
  }
}
