import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Equipment } from '@app/catalog/models/equipment';
import { AdminController } from '@app/admin/services';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable()
export class EquipmentDataSource extends DataSource<Equipment> {
  private equipmentSubj$ = new BehaviorSubject<Equipment[]>([]);
  private isLoadingSubj$ = new BehaviorSubject<Boolean>(false);
  constructor(private adminController: AdminController) {
    super();
  }

  connect(): Observable<Equipment[]> {
    return this.equipmentSubj$.asObservable();
  }

  disconnect(): void {
    this.equipmentSubj$.complete();
  }
  loadEquipments(): void {
    this.isLoadingSubj$.next(true);
    this.adminController
      .fetchEquipments()
      .pipe(
        tap((equipments) => this.equipmentSubj$.next(equipments)),
        finalize(() => this.isLoadingSubj$.next(false)),
      )
      .subscribe();
  }
}
