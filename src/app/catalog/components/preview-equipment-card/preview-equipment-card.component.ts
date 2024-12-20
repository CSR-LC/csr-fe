import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CatalogController } from '../../services';
import { Equipment } from '../../models/equipment';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@Component({
  selector: 'lc-preview-equipment-card',
  templateUrl: './preview-equipment-card.component.html',
  styleUrls: ['./preview-equipment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class PreviewEquipmentCardComponent implements OnInit {
  private readonly controller = inject(CatalogController);

  @Input() equipment!: Equipment;
  @ViewChild('image') image?: ElementRef;

  readonly defaultImage = './assets/img/no-photo.png';
  readonly equipmentPath = `/${AppRoutes.Catalog}/${AppRoutes.EquipMent}/`;

  ngOnInit(): void {
    this.controller.getPhotoById(this.equipment.photoID).subscribe((res) => {
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(res);

      if (!this.image) return;

      this.image.nativeElement.src = url;
    });
  }
}
