import { TableColumn } from '@app/shared/models/table-column';
import { ApplicationAction } from './application-action';

export const ApplicationColumns: TableColumn[] = [
  {
    header: 'Стаеус',
    columnDef: 'status',
    style: { 'width.px': 150 },
  },
  {
    header: 'Инвентарный номер',
    columnDef: 'equipmentInventoryNumber',
    style: null,
  },
  {
    header: 'Период бронирования',
    columnDef: 'rentPeriod',
    style: null,
  },
  {
    header: 'Название',
    columnDef: 'equipmentName',
    style: null,
  },
  {
    header: 'Наименование',
    columnDef: 'equipmentTitle',
    style: null,
  },
  {
    header: 'Фамилия',
    columnDef: 'userSurname',
    style: null,
  },
  {
    header: 'Имя',
    columnDef: 'userName',
    style: null,
  },
  {
    header: 'Телефон',
    columnDef: 'userPhoneNumber',
    style: null,
  },
  {
    header: '',
    columnDef: ApplicationAction.edit,
    action: ApplicationAction.edit,
    tooltip: 'Редактирование',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: ApplicationAction.more,
    action: ApplicationAction.more,
    tooltip: '???',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
];
