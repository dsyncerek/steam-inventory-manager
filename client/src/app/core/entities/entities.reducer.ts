import { Dictionary } from '@ngrx/entity';
import { BotActionTypes } from '../../features/bot/bot.actions';
import { Bot } from '../../features/bot/models/bot';
import { InventoryActionTypes } from '../../features/inventory/inventory.actions';
import { Inventory } from '../../features/inventory/models/inventory';
import { Item } from '../../features/item/models/item';
import { AppAction } from '../core.state';
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

export function entitiesReducer(state: EntitiesState = initialState, action: AppAction): EntitiesState {
  if ('payload' in action && 'entities' in action.payload) {
    return mergeEntities(state, action.payload.entities);
  }

  switch (action.type) {
    case BotActionTypes.DeleteBotSuccess:
      return { ...state, bots: deleteEntity(state.bots, action.payload.steamId) };

    case InventoryActionTypes.DeleteInventorySuccess:
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
