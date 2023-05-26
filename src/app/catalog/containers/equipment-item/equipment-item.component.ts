import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatalogController } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../models/equipment';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { dayCases } from '@shared/constants/day-cases';
import { Observable, of, switchMap } from 'rxjs';
import { UnavailableDates } from '@app/features/date-range/models';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Select } from '@ngxs/store';
import { AuthState } from '@app/auth/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/auth/models';

@UntilDestroy
@Component({
  selector: 'lc-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController, { provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class EquipmentItemComponent implements OnInit {
  @Select(AuthState.isUserPersonalData) isUserPersonalData$!: Observable<boolean>;
  @Select(AuthState.user) user!: Observable<User>;

  @ViewChild('image') image?: ElementRef;

  equipment?: Equipment;
  counter: number = 0;
  dayCases = dayCases;
  selectedRentPeriod: UnavailableDates | null = null;

  readonly defaultImage = './assets/img/no-photo.png';

  constructor(
    private readonly controller: CatalogController,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly mainPageHeaderService: MainPageHeaderService,
  ) {}

  ngOnInit(): void {
    this.controller.getCatalog();

    this.controller.getEquipmentItemInfo(this.route.snapshot.params['id']).subscribe((item) => {
      this.mainPageHeaderService.setPageTitle(item.name);
      this.equipment = item;
      this.setPhoto(item);
      this.cdr.markForCheck();
    });
  }

  getSelectedRentPeriod(equipmentId?: number, maxRentalPeriod?: number) {
    this.controller
      .getRentPeriods(equipmentId, maxRentalPeriod)
      .pipe(untilDestroyed(this))
      .subscribe((period) => {
        this.selectedRentPeriod = <UnavailableDates | null>period;
        this.cdr.markForCheck();
      });
  }

  createOrder(selectedRentPeriod: UnavailableDates, equipmentId?: number) {
    if (equipmentId) {
      this.isUserPersonalData$
        .pipe(
          switchMap((isPersonalData) => {
            if (isPersonalData) {
              return this.controller.openPersonalInfoModal();
            } else {
              return of(undefined);
            }
          }),
          switchMap(() => this.controller.updateUserPersonalInfo()),
          switchMap(() => this.isUserPersonalData$),
          switchMap((isPersonalData) => {
            if (isPersonalData) {
              return this.controller.getCreatedOrder(selectedRentPeriod, equipmentId);
            } else {
              return of(undefined);
            }
          }),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }

  private setPhoto(equipment: Equipment): void {
    this.controller.getPhotoById(equipment.photoID).subscribe((res) => {
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(res);

      if (!this.image) return;

      this.image.nativeElement.src = url;
    });
  }
}
