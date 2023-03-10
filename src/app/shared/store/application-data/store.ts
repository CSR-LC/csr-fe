import { BaseKind, PetSize } from '@app/management/models/management';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PetKindsAction, PetSizesAction } from '@shared/store/application-data/actions';

export type ApplicationData = {
  petKinds: BaseKind[] | null;
  petSizes: PetSize[] | null;
};

const defaults: ApplicationData = {
  petKinds: null,
  petSizes: null,
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

  @Action(PetKindsAction)
  petKinds(ctx: StateContext<ApplicationData>, action: PetKindsAction) {
    const state = ctx.getState();
    const petKinds = action.petKinds;
    ctx.patchState({
      ...state,
      petKinds,
    });
  }

  @Action(PetSizesAction)
  petSizes(ctx: StateContext<ApplicationData>, action: PetSizesAction) {
    const state = ctx.getState();
    const petSizes = action.petSizes;
    ctx.patchState({
      ...state,
      petSizes,
    });
  }
}
