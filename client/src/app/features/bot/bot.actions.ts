import { HttpErrorResponse } from '@angular/common/http';
import { Bot } from '@bot/models/bot';
import { Entities } from '@shared/models/entities';
import { createAction, props } from '@ngrx/store';

export const openAddBotDialog = createAction('BOT_OPEN_ADD_BOT_DIALOG');
export const openEditBotDialog = createAction('BOT_OPEN_EDIT_BOT_DIALOG', props<{ steamId: string }>());

export const getUserBots = createAction('BOT_GET_USER_BOTS', props<{ steamId: string }>());
export const getUserBotsSuccess = createAction('BOT_GET_USER_BOTS_SUCCESS', props<{ entities: Entities }>());
export const getUserBotsError = createAction('BOT_GET_USER_BOTS_ERROR', props<{ error: HttpErrorResponse }>());

export const getBot = createAction('BOT_GET_BOT', props<{ steamId: string }>());
export const getBotSuccess = createAction('BOT_GET_BOT_SUCCESS', props<{ entities: Entities }>());
export const getBotError = createAction('BOT_GET_BOT_ERROR', props<{ error: HttpErrorResponse }>());

export const createBot = createAction('BOT_CREATE_BOT', props<{ bot: Bot }>());
export const createBotSuccess = createAction('BOT_CREATE_BOT_SUCCESS', props<{ entities: Entities }>());
export const createBotError = createAction('BOT_CREATE_BOT_ERROR', props<{ error: HttpErrorResponse }>());

export const updateBot = createAction('BOT_UPDATE_BOT', props<{ bot: Bot }>());
export const updateBotSuccess = createAction('BOT_UPDATE_BOT_SUCCESS', props<{ entities: Entities }>());
export const updateBotError = createAction('BOT_UPDATE_BOT_ERROR', props<{ error: HttpErrorResponse }>());

export const deleteBot = createAction('BOT_DELETE_BOT', props<{ steamId: string }>());
export const deleteBotSuccess = createAction('BOT_DELETE_BOT_SUCCESS', props<{ steamId: string }>());
export const deleteBotError = createAction('BOT_DELETE_BOT_ERROR', props<{ error: HttpErrorResponse }>());
