import { UserAction } from '@shared/constants';
import { TableColumn } from '@shared/models/table-column';
import { UsersActionsTooltips } from '@app/admin/constants/users-actions-tooltips.enum';
import { TableSearchFilterComponent } from '@app/admin/components/table-search-filter/table-search-filter.component';

export const USER_COLUMNS: TableColumn[] = [
  {
    header: 'Электронная почта',
    columnDef: 'email',
    style: { 'minWidth.px': 200 },
    filterComponent: TableSearchFilterComponent,
  },
  {
    header: 'Телефон',
    columnDef: 'phone_umber',
    style: { 'minWidth.px': 150 },
    filterComponent: TableSearchFilterComponent,
  },
  {
    header: 'Фамилия',
    columnDef: 'surname',
    style: { 'minWidth.px': 200 },
    filterComponent: TableSearchFilterComponent,
  },
  {
    header: 'Имя',
    columnDef: 'name',
    style: { 'minWidth.px': 200 },
    filterComponent: TableSearchFilterComponent,
  },
  {
    header: 'Статус',
    columnDef: 'status',
    style: { 'width.px': 150 },
  },
  {
    header: '',
    columnDef: UserAction.Profile,
    action: UserAction.Profile,
    tooltip: UsersActionsTooltips.Profile,
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: UserAction.Block,
    action: UserAction.Block,
    tooltip: UsersActionsTooltips.Block,
    style: { 'width.px': 32, 'padding.px': 0 },
  },
  {
    header: '',
    columnDef: UserAction.Delete,
    action: UserAction.Delete,
    tooltip: UsersActionsTooltips.NoDelete,
    style: { 'width.px': 32, 'padding.px': 0 },
  },
];
