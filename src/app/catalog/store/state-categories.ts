import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Categories } from '../models';
import { GetCategories } from './actions-categories';

@State<Categories>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  constructor() {}
  @Selector()
  static categories(state: Categories) {
    return [...state.categories];
  }

  @Action(GetCategories)
  public getCatalogAction(ctx: StateContext<Categories>, action: GetCategories) {
    ctx.setState({ categories: action.categories });
  }
}
