import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';
import { BaseKind, PetSize } from '@app/shared/models/management';
import { Role } from '@app/auth/models/role';

export class PetKindsAction {
  static readonly type = '[Application data] PetKindsAction';
  constructor(public petKinds: BaseKind[]) {}
}

export class PetSizesAction {
  static readonly type = '[Application data] PetSizes';
  constructor(public petSizes: PetSize[]) {}
}

export class EquipmentStatusesAction {
  static readonly type = '[Application data] EquipmentStatuses';
  constructor(public equipmentStatuses: EquipmentStatus[]) {}
}

export class EquipmentCategoriesAction {
  static readonly type = '[Application data] EquipmentCategories';
  constructor(public equipmentCategories: Category[]) {}
}

export class RolesAction {
  static readonly type = '[Application data] Roles';
  constructor(public roles: Role[]) {}
}
