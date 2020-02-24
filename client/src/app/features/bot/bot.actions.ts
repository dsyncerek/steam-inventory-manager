import { Action } from '@ngrx/store';
import { Entities } from '../../core/entities/models/entities';
import { ErrorAction } from '../../shared/utils/error-action';
import { Bot } from './models/bot';

export enum BotActionTypes {
  GetUserBots = '[Bot] Get user bots',
  GetUserBotsSuccess = '[Bot] Get user bots - success',
  GetUserBotsError = '[Bot] Get user bots - error',

  GetBot = '[Bot] Get bot',
  GetBotSuccess = '[Bot] Get bot - success',
  GetBotError = '[Bot] Get bot - error',

  CreateBot = '[Bot] Create bot',
  CreateBotSuccess = '[Bot] Create bot - success',
  CreateBotError = '[Bot] Create bot - error',

  UpdateBot = '[Bot] Update bot',
  UpdateBotSuccess = '[Bot] Update bot - success',
  UpdateBotError = '[Bot] Update bot - error',

  DeleteBot = '[Bot] Delete bot',
  DeleteBotSuccess = '[Bot] Delete bot - success',
  DeleteBotError = '[Bot] Delete bot - error',
}

export class GetUserBots implements Action {
  readonly type = BotActionTypes.GetUserBots;

  constructor(public payload: { steamId: string }) {}
}

export class GetUserBotsSuccess implements Action {
  readonly type = BotActionTypes.GetUserBotsSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class GetUserBotsError extends ErrorAction {
  readonly type = BotActionTypes.GetUserBotsError;
}

export class GetBot implements Action {
  readonly type = BotActionTypes.GetBot;

  constructor(public payload: { steamId: string }) {}
}

export class GetBotSuccess implements Action {
  readonly type = BotActionTypes.GetBotSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class GetBotError extends ErrorAction {
  readonly type = BotActionTypes.GetBotError;
}

export class CreateBot implements Action {
  readonly type = BotActionTypes.CreateBot;

  constructor(public payload: { bot: Bot }) {}
}

export class CreateBotSuccess implements Action {
  readonly type = BotActionTypes.CreateBotSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class CreateBotError extends ErrorAction {
  readonly type = BotActionTypes.CreateBotError;
}

export class UpdateBot implements Action {
  readonly type = BotActionTypes.UpdateBot;

  constructor(public payload: { bot: Bot }) {}
}

export class UpdateBotSuccess implements Action {
  readonly type = BotActionTypes.UpdateBotSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class UpdateBotError extends ErrorAction {
  readonly type = BotActionTypes.UpdateBotError;
}

export class DeleteBot implements Action {
  readonly type = BotActionTypes.DeleteBot;

  constructor(public payload: { steamId: string }) {}
}

export class DeleteBotSuccess implements Action {
  readonly type = BotActionTypes.DeleteBotSuccess;

  constructor(public payload: { steamId: string }) {}
}

export class DeleteBotError extends ErrorAction {
  readonly type = BotActionTypes.DeleteBotError;
}

export type BotAction =
  | GetUserBots
  | GetUserBotsSuccess
  | GetUserBotsError
  | GetBot
  | GetBotSuccess
  | GetBotError
  | CreateBot
  | CreateBotSuccess
  | CreateBotError
  | UpdateBot
  | UpdateBotSuccess
  | UpdateBotError
  | DeleteBot
  | DeleteBotSuccess
  | DeleteBotError;
