import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable } from "rxjs";
import { GetCatalog } from "./actions";
import { Catalog } from "../models";
import { Equipment } from "../models/equipment";

@State<Catalog>({
    name: 'catalog',
    defaults: {
        equipments: []
    }
  })
  @Injectable()
  export class CatalogState {
    constructor() {}
    @Selector()
    static catalog(state: Catalog) {
      return state.equipments;
    }

    @Action(GetCatalog)
    public getCatalogAction(ctx: StateContext<Catalog>, action: GetCatalog) {
        ctx.setState({equipments: action.catalog});
    }
  }