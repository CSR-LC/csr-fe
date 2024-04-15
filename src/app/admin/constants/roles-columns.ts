import { UserAction } from '@shared/constants';
import { TableColumn } from '@shared/models/table-column';

export const ROLES_COLUMNS: TableColumn[] = [
  {
    header: 'Электронная почта',
    columnDef: 'email',
    style: { 'minWidth.px': 200 },
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
    header: 'Роль',
    columnDef: 'roleName',
    style: { 'width.px': 150 },
  },
  {
    header: '',
    columnDef: UserAction.Delete,
    action: UserAction.Delete,
    tooltip: 'Удаление',
    style: { 'width.px': 32, 'padding.px': 0 },
  },
];
