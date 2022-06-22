import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Equipment} from "../../models/equipment";

@Component({
  selector: 'lc-preview-equipment-card',
  templateUrl: './preview-equipment-card.component.html',
  styleUrls: ['./preview-equipment-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewEquipmentCardComponent implements OnInit {

  public defaultImage = "./assets/img/no-photo.png";

  @Input() equipment!: Equipment;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
