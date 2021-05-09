import {createReducer, on} from '@ngrx/store';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {setItem, unSetItem} from './ingreso-egreso.actios';
import {AppState} from '../app.reducer';


export interface State {
  items: IngresoEgreso[];
}
export interface StateWithIngresoEgreso  extends AppState{
  ingresoEgreso: State;
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItem, (state, {items}) => ({...state, items: [...items]})),
  on(unSetItem, (state) => ({...state, items: []}))
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
