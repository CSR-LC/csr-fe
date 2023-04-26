import { ActionEnum } from '@app/shared/models/action.enum';
import { TableColumn } from '@app/shared/models/table';

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
    tooltip: 'Тултип',
    style: { 'width.px': 150 },
  },
  {
    header: '',
    columnDef: ActionEnum.Block,
    action: ActionEnum.Block,
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: ActionEnum.Edit,
    action: ActionEnum.Edit,
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: ActionEnum.Archivate,
    action: ActionEnum.Archivate,
    style: { 'width.px': 32 },
  },
];
