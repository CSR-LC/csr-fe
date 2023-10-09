export enum EquipmentAction {
  Block = 'lock',
  Archivate = 'archive',
  Edit = 'edit',
}

export enum UserAction {
  Profile = 'person',
  Block = 'lock',
  Delete = 'delete',
}

export type AdminTableAction = EquipmentAction | UserAction;
