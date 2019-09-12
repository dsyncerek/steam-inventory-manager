import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loadable, loadableDefault, loadableError, loadableLoad, loadableSuccess } from '../../shared/utils/loadable';
import { Bot, selectBotId } from '../models/bot';
import { BotActions, BotActionTypes } from './bot.actions';

export const adapter: EntityAdapter<Bot> = createEntityAdapter<Bot>({ selectId: selectBotId });

export interface BotState extends Loadable, EntityState<Bot> {}

export const initialState: BotState = adapter.getInitialState({ ...loadableDefault() });

export function botReducer(state = initialState, action: BotActions): BotState {
  switch (action.type) {
    case BotActionTypes.GetAllBotsSuccess:
    case BotActionTypes.GetUserBotsSuccess:
      return adapter.upsertMany(action.payload.bots, { ...state, ...loadableSuccess() });

    case BotActionTypes.GetBotSuccess:
    case BotActionTypes.CreateBotSuccess:
    case BotActionTypes.UpdateBotSuccess:
      return adapter.upsertOne(action.payload.bot, { ...state, ...loadableSuccess() });

    case BotActionTypes.DeleteBotSuccess:
      return adapter.removeOne(action.payload.steamId, { ...state, ...loadableSuccess() });

    case BotActionTypes.GetAllBots:
    case BotActionTypes.GetUserBots:
    case BotActionTypes.GetBot:
    case BotActionTypes.CreateBot:
    case BotActionTypes.UpdateBot:
    case BotActionTypes.DeleteBot:
      return { ...state, ...loadableLoad() };

    case BotActionTypes.GetAllBotsError:
    case BotActionTypes.GetUserBotsError:
    case BotActionTypes.GetBotError:
    case BotActionTypes.CreateBotError:
    case BotActionTypes.UpdateBotError:
    case BotActionTypes.DeleteBotError:
      return { ...state, ...loadableError(action.payload.error) };

    default:
      return state;
  }
}
