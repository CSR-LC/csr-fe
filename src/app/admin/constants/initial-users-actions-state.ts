import { UserAction } from '@shared/constants';

export const INITIAL_USERS_ACTIONS_STATE = {
  [UserAction.Profile]: {
    tooltip: '',
    disabled: false,
  },
  [UserAction.Block]: {
    tooltip: '',
    disabled: false,
  },
  [UserAction.Delete]: {
    tooltip: '',
    disabled: true,
  },
};
