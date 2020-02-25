import { Dictionary } from '@ngrx/entity';
import { Bot } from '../../features/bot/models/bot';
import { Inventory } from '../../features/inventory/models/inventory';
import { Item } from '../../features/item/models/item';
import { AnyAction } from '../../shared/utils/any-action';
import { Entities } from './models/entities';

export interface EntitiesState {
  bots: Dictionary<Bot>;
  inventories: Dictionary<Inventory>;
  items: Dictionary<Item>;
}

export const initialState: EntitiesState = {
  bots: {},
  inventories: {},
  items: {},
};

export function entitiesReducer(state: EntitiesState = initialState, action: AnyAction): EntitiesState {
  if (action.payload?.entities !== undefined) {
    return mergeEntities(state, action.payload.entities);
  }

  return state;
}

function mergeEntities(state: EntitiesState, newEntities: Entities): EntitiesState {
  return {
    ...state,
    bots: { ...state.bots, ...newEntities.bots },
    inventories: { ...state.inventories, ...newEntities.inventories },
    items: { ...state.items, ...newEntities.items },
  };
}
