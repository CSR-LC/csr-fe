import { BaseKind, PetSize } from '@app/shared/models/management';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  ApplicationStatusesAction,
  EquipmentCategoriesAction,
  EquipmentStatusesAction,
  PetKindsAction,
  PetSizesAction,
  RolesAction,
} from '@shared/store/application-data/actions';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';
import { Role } from '@app/auth/models/role';
import { ItemTranslated } from '@app/shared/types';

export type ApplicationData = {
  petKinds: BaseKind[] | null;
  petSizes: PetSize[] | null;
  equipmentStatuses: EquipmentStatus[] | null;
  equipmentCategories: Category[] | null;
  roles: Role[] | null;
  applicationStatuses: ItemTranslated[] | null;
};

const defaults: ApplicationData = {
  petKinds: null,
  petSizes: null,
  equipmentStatuses: null,
  equipmentCategories: null,
  roles: null,
  applicationStatuses: null,
};

@State<ApplicationData>({
  name: 'application_data',
  defaults: {
    ...defaults,
  },
})
@Injectable()
export class ApplicationDataState {
  @Selector()
  static petKinds(state: ApplicationData): BaseKind[] | null {
    return state.petKinds;
  }

  @Selector()
  static petSizes(state: ApplicationData): PetSize[] | null {
    return state.petSizes;
  }

  @Selector()
  static equipmentStatuses(state: ApplicationData): EquipmentStatus[] | null {
    return state.equipmentStatuses;
  }

  @Selector()
  static equipmentCategories(state: ApplicationData): Category[] | null {
    return state.equipmentCategories;
  }

  @Selector()
  static roles(state: ApplicationData): Role[] | null {
    return state.roles;
  }

  @Selector()
  static applicationStatuses(state: ApplicationData): ItemTranslated[] | null {
    return state.applicationStatuses;
  }

  @Action(PetKindsAction)
  petKinds(ctx: StateContext<ApplicationData>, action: PetKindsAction) {
    const petKinds = action.petKinds;
    ctx.patchState({
      petKinds,
    });
  }

  @Action(PetSizesAction)
  petSizes(ctx: StateContext<ApplicationData>, action: PetSizesAction) {
    const petSizes = action.petSizes;
    ctx.patchState({
      petSizes,
    });
  }

  @Action(EquipmentStatusesAction)
  equipmentStatuses(ctx: StateContext<ApplicationData>, action: EquipmentStatusesAction) {
    const equipmentStatuses = action.equipmentStatuses;
    ctx.patchState({
      equipmentStatuses,
    });
  }

  @Action(EquipmentCategoriesAction)
  equpmentCategories(ctx: StateContext<ApplicationData>, action: EquipmentCategoriesAction) {
    const equipmentCategories = action.equipmentCategories;
    ctx.patchState({
      equipmentCategories,
    });
  }

  @Action(RolesAction)
  roles(ctx: StateContext<ApplicationData>, action: RolesAction) {
    const roles = action.roles;
    ctx.patchState({
      roles,
    });
  }

  @Action(ApplicationStatusesAction)
  applicationStatuses(ctx: StateContext<ApplicationData>, action: ApplicationStatusesAction) {
    const applicationStatuses = action.applicationStatuses;
    ctx.patchState({
      applicationStatuses,
    });
  }
}
