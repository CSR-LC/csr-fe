import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Equipment } from '@app/catalog/models/equipment';
import { Label } from '@app/admin/constants/label';

@Component({
  selector: 'lc-equipment-info',
  templateUrl: './equipment-info.component.html',
  styleUrls: ['./equipment-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentInfoComponent {
  @Input() equipment?: Equipment;
  LabelEnum = Label;
}
