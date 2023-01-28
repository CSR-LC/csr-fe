import { PersonalInfo } from '@shared/constants/personal-info.enum';

export interface UserPersonalInfo {
  name: string;
  surname: string;
  phoneNumber: string;
  source: PersonalInfo;
}
