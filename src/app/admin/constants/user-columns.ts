import { UserAction } from '@shared/constants';
import { TableColumn } from '@shared/models/table-column';

export const USER_COLUMNS: TableColumn[] = [
  {
    header: 'Электронная почта',
    columnDef: 'email',
    style: { 'minWidth.px': 200 },
  },
  {
    header: 'Телефон',
    columnDef: 'phone_umber',
    style: { 'minWidth.px': 150 },
  },
  {
    header: 'Фамилия',
    columnDef: 'surname',
    style: { 'minWidth.px': 200 },
  },
  {
    header: 'Имя',
    columnDef: 'name',
    style: { 'minWidth.px': 200 },
  },
  {
    header: 'Статус',
    columnDef: 'status',
    style: { 'width.px': 100 },
  },
  {
    header: '',
    columnDef: UserAction.Profile,
    action: UserAction.Profile,
    tooltip: 'Профиль',
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: UserAction.Block,
    action: UserAction.Block,
    tooltip: 'Блокировать',
    style: { 'width.px': 32 },
  },
  {
    header: '',
    columnDef: UserAction.Delete,
    action: UserAction.Delete,
    tooltip: 'Удалить',
    style: { 'width.px': 32 },
  },
];
