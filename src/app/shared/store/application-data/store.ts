import { BaseKind, PetSize } from '@app/management/models/management';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  EquipmentCategoriesAction,
  EquipmentStatusesAction,
  PetKindsAction,
  PetSizesAction,
} from '@shared/store/application-data/actions';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';

export type ApplicationData = {
  petKinds: BaseKind[] | null;
  petSizes: PetSize[] | null;
  equipmentStatuses: EquipmentStatus[] | null;
  equipmentCategories: Category[] | null;
};

const defaults: ApplicationData = {
  petKinds: null,
  petSizes: null,
  equipmentStatuses: null,
  equipmentCategories: null,
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

  @Action(PetKindsAction)
  petKinds(ctx: StateContext<ApplicationData>, action: PetKindsAction) {
    const state = ctx.getState();
    const petKinds = action.petKinds;
    ctx.patchState({
      petKinds,
    });
  }

  @Action(PetSizesAction)
  petSizes(ctx: StateContext<ApplicationData>, action: PetSizesAction) {
    const state = ctx.getState();
    const petSizes = action.petSizes;
    ctx.patchState({
      petSizes,
    });
  }

  @Action(EquipmentStatusesAction)
  equipmentStatuses(ctx: StateContext<ApplicationData>, action: EquipmentStatusesAction) {
    const state = ctx.getState();
    const equipmentStatuses = action.equipmentStatuses;
    ctx.patchState({
      equipmentStatuses,
    });
  }

  @Action(EquipmentCategoriesAction)
  equpmentCategories(ctx: StateContext<ApplicationData>, action: EquipmentCategoriesAction) {
    const state = ctx.getState();
    const equipmentCategories = action.equipmentCategories;
    ctx.patchState({
      equipmentCategories,
    });
  }
}
