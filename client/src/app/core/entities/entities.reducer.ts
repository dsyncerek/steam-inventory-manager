import { deleteBotSuccess } from '@bot/bot.actions';
import { Bot } from '@bot/models/bot';
import { Entities } from '@core/entities/models/entities';
import { deleteInventorySuccess } from '@inventory/inventory.actions';
import { Inventory } from '@inventory/models/inventory';
import { Item } from '@item/models/item';
import { Dictionary } from '@ngrx/entity';
import { AnyAction } from '@shared/utils/any-action';

export const entitiesFeatureKey = 'entities';

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
  if ('entities' in action) {
    return mergeEntities(state, action.entities);
  }

  switch (action.type) {
    case deleteBotSuccess.type:
      return { ...state, bots: deleteEntity(state.bots, action.payload.steamId) };

    case deleteInventorySuccess.type:
      return { ...state, inventories: deleteEntity(state.inventories, action.payload.id) };

    default:
      return state;
  }
}

function mergeEntities(state: EntitiesState, newEntities: Entities): EntitiesState {
  return {
    ...state,
    bots: { ...state.bots, ...newEntities.bots },
    inventories: { ...state.inventories, ...newEntities.inventories },
    items: { ...state.items, ...newEntities.items },
  };
}

function deleteEntity<T>(entities: Dictionary<T>, id: string): Dictionary<T> {
  const { [id]: toRemove, ...rest } = entities;
  return rest;
}
