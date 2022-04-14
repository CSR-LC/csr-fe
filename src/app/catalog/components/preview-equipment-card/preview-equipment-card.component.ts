import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogController} from "../../services";

@Component({
  selector: 'lc-preview-equipment-card',
  templateUrl: './preview-equipment-card.component.html',
  styleUrls: ['./preview-equipment-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewEquipmentCardComponent implements OnInit {

  @Input() equipmentName: string | undefined;
  @Input() equipmentInfo: string | undefined;
  @Input() equipmentImg: string | undefined;

  @Output('onInfo') onInfoEmit = new EventEmitter();
  @Output('onOrder') onOrderEmit = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public onOrder() {
    this.onOrderEmit.emit();
  }

  public onInfo() {
    this.onInfoEmit.emit();
  }
}
