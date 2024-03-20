import { ItemTranslated } from '@app/shared/types';
import { Application } from './application';

export type ApplicationStatusModalData = {
  application: Application;
  rentPeriod: string;
  statusTranslation: string;
  statuses: ItemTranslated[];
};
