import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loadable, loadableDefault, loadableError, loadableLoad, loadableSuccess } from '../../shared/utils/loadable';
import { Item, selectItemId } from '../models/item';
import { ItemActions, ItemActionTypes } from './item.actions';

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({ selectId: selectItemId });

export interface ItemState extends Loadable, EntityState<Item> {}

export const initialState: ItemState = adapter.getInitialState({ ...loadableDefault() });

export function itemReducer(state = initialState, action: ItemActions): ItemState {
  switch (action.type) {
    case ItemActionTypes.GetAllItemsSuccess:
      return adapter.upsertMany(action.payload.items, { ...state, ...loadableSuccess() });

    case ItemActionTypes.CreateItemSuccess:
    case ItemActionTypes.GetItemSuccess:
    case ItemActionTypes.UpdateItemSuccess:
      return adapter.upsertOne(action.payload.item, { ...state, ...loadableSuccess() });

    case ItemActionTypes.DeleteItemSuccess:
      return adapter.removeOne(action.payload.classId, { ...state, ...loadableSuccess() });

    case ItemActionTypes.CreateItem:
    case ItemActionTypes.DeleteItem:
    case ItemActionTypes.GetItem:
    case ItemActionTypes.GetAllItems:
    case ItemActionTypes.UpdateItem:
      return { ...state, ...loadableLoad() };

    case ItemActionTypes.CreateItemError:
    case ItemActionTypes.DeleteItemError:
    case ItemActionTypes.GetItemError:
    case ItemActionTypes.UpdateItemError:
    case ItemActionTypes.GetAllItemsError:
      return { ...state, ...loadableError(action.payload.error) };

    default:
      return state;
  }
}
