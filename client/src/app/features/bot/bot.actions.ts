import { Action } from '@ngrx/store';
import { Entities } from '../../core/entities/models/entities';
import { ErrorAction } from '../../shared/utils/error-action';
import { Bot } from './models/bot';

export enum BotActionTypes {
  GetUserBots = 'BOT_GET_USER_BOTS',
  GetUserBotsSuccess = 'BOT_GET_USER_BOTS_SUCCESS',
  GetUserBotsError = 'BOT_GET_USER_BOTS_ERROR',

  GetBot = 'BOT_GET_BOT',
  GetBotSuccess = 'BOT_GET_BOT_SUCCESS',
  GetBotError = 'BOT_GET_BOT_ERROR',

  CreateBot = 'BOT_CREATE_BOT',
  CreateBotSuccess = 'BOT_CREATE_BOT_SUCCESS',
  CreateBotError = 'BOT_CREATE_BOT_ERROR',

  UpdateBot = 'BOT_UPDATE_BOT',
  UpdateBotSuccess = 'BOT_UPDATE_BOT_SUCCESS',
  UpdateBotError = 'BOT_UPDATE_BOT_ERROR',

  DeleteBot = 'BOT_DELETE_BOT',
  DeleteBotSuccess = 'BOT_DELETE_BOT_SUCCESS',
  DeleteBotError = 'BOT_DELETE_BOT_ERROR',
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
