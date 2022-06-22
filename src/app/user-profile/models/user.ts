export type User = {
  surname: string,
  name: string,
  patronymic?: string,
  documentNumber: string,
  documentIssuingInfo: string,
  phoneNumber: string,
  email: string,
  status?: string,
  organizationName?: string,
  organizationContact?: string,
  personalAccount?: string,
  activeArea?: number,
};

export type ActiveArea = {
  id: number,
  name: string,
}
