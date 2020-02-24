import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../core.state';
import { EntitiesState } from './entities.reducer';

export const selectEntitiesState = createFeatureSelector<AppState, EntitiesState>('entities');
