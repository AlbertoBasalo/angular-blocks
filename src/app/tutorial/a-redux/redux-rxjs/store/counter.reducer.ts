import { CounterAction, CounterActionTypes } from './counter.actions';
import { CounterState, INITIAL_COUNTER_STATE } from './counter.state';

export function counterReducer(state: CounterState = INITIAL_COUNTER_STATE, action: CounterAction): CounterState {
  const result = { ...state };
  switch (action.type) {
    case CounterActionTypes.Add:
      result.value += action.payload;
      break;
    case CounterActionTypes.Substract:
      result.value -= action.payload;
      break;
    default:
      break;
  }
  return result;
}
