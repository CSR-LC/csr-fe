import { EquipmentAction } from '@shared/constants';
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
    columnDef: 'categoryName',
    style: { 'width.px': 150 },
  },
  {
    header: 'Статус',
    columnDef: 'statusName',
    style: { 'width.px': 150 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Block,
    action: EquipmentAction.Block,
    tooltip: 'Блокировка',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Edit,
    action: EquipmentAction.Edit,
    tooltip: 'Редактирование',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Archivate,
    action: EquipmentAction.Archivate,
    tooltip: 'Архивирование',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: EquipmentAction.Orders,
    action: EquipmentAction.Orders,
    tooltip: 'Перейти к заявкам',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
];
