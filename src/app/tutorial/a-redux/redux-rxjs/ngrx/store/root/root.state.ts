import { GlobalState } from './global/global.state';
import { ItemsState } from './items/items.state';

export interface RootState {
  global: GlobalState;
  items: ItemsState;
  router: any;
}
