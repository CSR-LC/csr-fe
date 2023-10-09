export type User = {
  email: string;
  id: number;
  is_readonly: boolean;
  is_registration_confirmed: boolean;
  login: string;
  name: string;
  org_name: string;
  passport_authority: string;
  passport_issue_date: string;
  passport_number: string;
  passport_series: string;
  patronymic: string;
  phone_number: string;
  role: {
    id: 0;
    name: string;
  };
  surname: string;
  type: string;
};
