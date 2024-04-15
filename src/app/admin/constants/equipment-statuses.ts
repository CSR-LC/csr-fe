import { Dictionary } from '@app/shared/types';

export const equipmentStatuses: Dictionary<string> = {
  available: 'Свободно ',
  booked: 'Забронировано ',
  'in use': 'Используется ',
  'not available': 'Заблокировано ',
  archived: 'В архиве',
};
