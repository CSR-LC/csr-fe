import { EquipmentAction } from '@shared/constants';

export const INITIAL_EQUIPMENT_ACTIONS_STATE = {
  [EquipmentAction.Archivate]: {
    tooltip: '',
    disabled: false,
  },
  [EquipmentAction.Edit]: {
    tooltip: '',
    disabled: false,
  },
  [EquipmentAction.Block]: {
    tooltip: '',
    disabled: false,
  },
  [EquipmentAction.Orders]: {
    tooltip: '',
    disabled: false,
  },
};
