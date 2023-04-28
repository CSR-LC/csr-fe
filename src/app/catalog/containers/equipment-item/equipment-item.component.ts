import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatalogController } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../models/equipment';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { dayCases } from '@shared/constants/day-cases';

@Component({
  selector: 'lc-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class EquipmentItemComponent implements OnInit {
  @ViewChild('image') image?: ElementRef;

  equipment?: Equipment;
  counter: number = 0;
  dayCases = dayCases;

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

  private setPhoto(equipment: Equipment): void {
    this.controller.getPhotoById(equipment.photoID).subscribe((res) => {
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(res);

      if (!this.image) return;

      this.image.nativeElement.src = url;
    });
  }

  getRentPeriods(id?: number) {
    this.controller.getRentPeriods(id);
  }
}
