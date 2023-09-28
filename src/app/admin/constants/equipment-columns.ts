import { EquipmentAction } from '@shared/constants/action.enum';
import { TableColumn } from '@shared/models/table-column';

export const EquipmentColumns: TableColumn[] = [
  {
    header: 'Инвентарный номер',
    columnDef: 'inventoryNumber',
    style: { 'width.px': 150 },
  },
  {
    header: 'Название',
    columnDef: 'name',
    style: null,
  },
  {
    header: 'Наименование',
    columnDef: 'title',
    style: null,
  },
  {
    header: 'Категория',
    columnDef: 'category',
    style: { 'width.px': 150 },
  },
  {
    header: 'Статус',
    columnDef: 'status',
    style: { 'width.px': 150 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Block,
    action: EquipmentAction.Block,
    tooltip: 'Блокировать',
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Edit,
    action: EquipmentAction.Edit,
    tooltip: 'Редактировать',
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Archivate,
    action: EquipmentAction.Archivate,
    tooltip: 'Архивировать',
    style: { 'width.px': 32 },
  },
];
