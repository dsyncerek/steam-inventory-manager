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

export const botFeatureKey = 'bot';
export const botAdapter = createEntityAdapter<Bot>({ selectId: selectBotId, sortComparer: botSortComparer });

// eslint-disable-next-line
export interface BotState extends EntityState<Bot> {}

const initialState: BotState = botAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(getUserBotsSuccess, getBotSuccess, createBotSuccess, updateBotSuccess, (state, action) => {
    return botAdapter.upsertMany(Object.values(action.entities.bots ?? {}), state);
  }),
  on(deleteBotSuccess, (state, action) => {
    return botAdapter.removeOne(action.steamId, state);
  }),
);

export function botReducer(state: BotState | undefined, action: Action): BotState {
  return reducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = botAdapter.getSelectors();
