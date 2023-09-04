import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetCatalog, SetEquipmentFilter, SetSearchInput, SetSelectedCategoryId } from './actions';
import { Catalog, EquipmentFilter, EquipmentFilterForm } from '../models';

@State<Catalog>({
  name: 'catalog',
  defaults: {
    equipments: [],
    selectedCategoryId: 0,
    equipmentFilterForm: {
      model: undefined,
      dirty: false,
      errors: null,
      status: null,
    },
    equipmentFilter: {
      petKinds: [],
      petSize: [],
      technicalIssues: undefined,
    },
    searchInput: '',
  },
})
@Injectable()
export class CatalogState {
  @Selector()
  static catalog(state: Catalog) {
    return state.equipments;
  }

  @Selector()
  static selectedCategoryId(state: Catalog) {
    return state.selectedCategoryId;
  }

  @Selector()
  static equipmentFilterForm(state: Catalog): EquipmentFilterForm {
    return state.equipmentFilterForm;
  }

  @Selector()
  static searchInput(state: Catalog): string {
    return state.searchInput;
  }

  @Selector()
  static equipmentFilter(state: Catalog): EquipmentFilter {
    return state.equipmentFilter;
  }

  @Selector()
  static equipmentFilterCount(state: Catalog): number {
    const { petKinds, petSize, technicalIssues } = state.equipmentFilter;
    return +Boolean(petKinds?.length) + +Boolean(petSize?.length) + +(!!technicalIssues === technicalIssues);
  }

  @Action(GetCatalog)
  getCatalogAction(ctx: StateContext<Catalog>, action: GetCatalog) {
    const state = ctx.getState();
    const equipments = action.catalog;

    ctx.patchState({
      ...state,
      equipments,
    });
  }

  @Action(SetSelectedCategoryId)
  setSelectedCategoryIdAction(ctx: StateContext<Catalog>, action: SetSelectedCategoryId) {
    const state = ctx.getState();
    const selectedCategoryId = action.categoryId;

    ctx.patchState({
      ...state,
      selectedCategoryId,
    });
  }

  @Action(SetSearchInput)
  setSearchInputAction(ctx: StateContext<Catalog>, action: SetSearchInput) {
    const state = ctx.getState();
    const searchInput = action.searchInput;

    ctx.patchState({
      ...state,
      searchInput,
    });
  }

  @Action(SetEquipmentFilter)
  setEquipmentFilterAction(ctx: StateContext<Catalog>, action: SetEquipmentFilter) {
    const state = ctx.getState();
    const equipmentFilter = action.equipmentFilter;

    ctx.patchState({
      ...state,
      equipmentFilter,
    });
  }
}
