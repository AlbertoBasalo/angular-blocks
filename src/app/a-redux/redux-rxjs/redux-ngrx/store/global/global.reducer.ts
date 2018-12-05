import { GlobalActions, GlobalActionTypes } from './global.actions';
import { GLOBAL_INITIAL_STATE } from './global.state';

export function globalReducer(state = GLOBAL_INITIAL_STATE, action: GlobalActions) {
  const result = { ...state };
  switch (action.type) {
    case GlobalActionTypes.IncrementCallsCounter:
      result.callsCounter++;
      break;
    default:
      break;
  }
  return result;
}
