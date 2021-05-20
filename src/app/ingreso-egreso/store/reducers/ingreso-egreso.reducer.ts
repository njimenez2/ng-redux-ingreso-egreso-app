import {createReducer, on} from '@ngrx/store';
import {IngresoEgreso} from '../../../models/ingreso-egreso.model';
import {setItem, unSetItem} from '../actions/ingreso-egreso.actios';
import {AppState} from '../../../store/app.reducer';


export interface IngresoEgresoState {
  items: IngresoEgreso[];
}
export interface StateWithIngresoEgreso  extends AppState{
  ingresoEgreso: IngresoEgresoState;
}

export const initialState: IngresoEgresoState = {
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
