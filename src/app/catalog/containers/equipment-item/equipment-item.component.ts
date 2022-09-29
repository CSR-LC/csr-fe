import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CatalogController} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {first, Observable} from "rxjs";
import {Equipment} from "../../models/equipment";
import {MainPageHeaderService} from "@shared/services/main-page-header.service";

@Component({
  selector: 'lc-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class EquipmentItemComponent implements OnInit {
  @ViewChild('image') image?: ElementRef;

  catalog$ = this.controller.catalog$;
  equipment!: Observable<Equipment>;

  readonly defaultImage = "./assets/img/no-photo.png";

  constructor(
    private controller: CatalogController,
    private route: ActivatedRoute,
    private mainPageHeaderService: MainPageHeaderService
  ) {}

  ngOnInit(): void {
    this.controller.getCatalog();
    this.equipment = this.controller.getEquipmentItemInfo(this.route.snapshot.params['id']);

    this.equipment.pipe(
      first()
    ).subscribe(item => {
      this.mainPageHeaderService.setPageTitle(item.name)
      this.setPhoto(item)
    });
  }

  private setPhoto(equipment: Equipment): void {
    this.controller.getPhotoById(equipment.photoID).subscribe(res => {
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(res);

      if (!this.image) return;

      this.image.nativeElement.src = url;
    })
  }
}
