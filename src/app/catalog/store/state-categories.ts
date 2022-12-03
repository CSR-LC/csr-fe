import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EquipmentCategories } from '../models';
import { GetCategories } from './actions-categories';

@State<EquipmentCategories>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  constructor() {}
  @Selector()
  static categories(state: EquipmentCategories) {
    return { ...state.categories };
  }

  @Action(GetCategories)
  public getCatalogAction(ctx: StateContext<EquipmentCategories>, action: GetCategories) {
    ctx.setState({ categories: action.categories });
  }
}
