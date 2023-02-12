import { Injectable } from '@angular/core';
import { EquipmentFilter } from '@app/shared/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private dataSubject = new BehaviorSubject<EquipmentFilter>({});
  public data$ = this.dataSubject.asObservable();
  private countSubject = new BehaviorSubject<number>(0);
  public count$ = this.countSubject.asObservable();
  private routeParamSubject = new BehaviorSubject<any>({});
  public routeParam$ = this.routeParamSubject.asObservable();

  updateData(data: EquipmentFilter, count: number) {
    this.dataSubject.next(data);
    this.countSubject.next(count);
  }

  shareRouteParam(routeParam: any) {
    this.routeParamSubject.next(routeParam);
  }
}
