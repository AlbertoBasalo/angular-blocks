import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ItemsState {
  data: any[];
  working: boolean;
  completedOk: boolean;
  message: string;
}
export const INITIAL_ITEMS_STATE: ItemsState = {
  data: [],
  working: false,
  completedOk: false,
  message: ''
};

const itemsFeatureSelector = createFeatureSelector('items');
export const messageSelector = createSelector(
  itemsFeatureSelector,
  (state: ItemsState) => state.message
);
export const completedOkSelector = createSelector(
  itemsFeatureSelector,
  (state: ItemsState) => state.completedOk
);
