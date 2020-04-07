import { AppState } from '@core/core.state';
import { entitiesFeatureKey, EntitiesState } from '@core/entities/entities.reducer';
import { createFeatureSelector } from '@ngrx/store';

export const selectEntitiesState = createFeatureSelector<AppState, EntitiesState>(entitiesFeatureKey);
