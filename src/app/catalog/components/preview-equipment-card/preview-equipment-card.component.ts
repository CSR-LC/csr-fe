import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { CatalogController } from '../../services';
import {Equipment} from "../../models/equipment";

@Component({
  selector: 'lc-preview-equipment-card',
  templateUrl: './preview-equipment-card.component.html',
  styleUrls: ['./preview-equipment-card.component.less'],
  providers: [ CatalogController ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewEquipmentCardComponent implements OnInit {
  @Input() equipment!: Equipment;
  @ViewChild('image') image?: ElementRef;

  readonly defaultImage = "./assets/img/no-photo.png";

  constructor(
    private readonly controller: CatalogController
  ) {}

  ngOnInit(): void {
    this.controller.getPhotoById(this.equipment.photoID).subscribe(res => {
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(res);

      if (!this.image) return;

      this.image.nativeElement.src = url;
    });
  }
}
