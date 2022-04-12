import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CatalogController} from "../../services";

@Component({
  selector: 'lc-preview-equipment-card',
  templateUrl: './preview-equipment-card.component.html',
  styleUrls: ['./preview-equipment-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class PreviewEquipmentCardComponent implements OnInit {

  @Input() equipmentName: string | undefined;
  @Input() equipmentInfo: string | undefined;
  @Input() equipmentImg: string | undefined;

  constructor(
      private controller: CatalogController
  ) { }

  ngOnInit(): void {
  }

  public onOrder() {
    this.controller.onOrder();
  }

  public onInfo() {
    this.controller.onInfo();
  }
}
