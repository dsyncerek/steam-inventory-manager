import {
  createBotSuccess,
  deleteBotSuccess,
  getBotSuccess,
  getUserBotsSuccess,
  updateBotSuccess,
} from '@bot/bot.actions';
import { Bot, botSortComparer, selectBotId } from '@bot/models/bot';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { createInventorySuccess } from '../inventory/inventory.actions';

export const botFeatureKey = 'bot';
export const botAdapter = createEntityAdapter<Bot>({ selectId: selectBotId, sortComparer: botSortComparer });

export interface BotState extends EntityState<Bot> {}

const initialState: BotState = botAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(getUserBotsSuccess, getBotSuccess, createBotSuccess, updateBotSuccess, (state, action) => {
    return botAdapter.upsertMany(Object.values(action.entities.bots ?? {}), state);
  }),
  on(deleteBotSuccess, (state, { steamId }) => {
    return botAdapter.removeOne(steamId, state);
  }),
  on(createInventorySuccess, (state, action) => {
    // todo
    return state;
  }),
);

export function botReducer(state: BotState | undefined, action: Action): BotState {
  return reducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = botAdapter.getSelectors();
