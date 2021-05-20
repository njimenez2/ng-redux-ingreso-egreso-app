import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IngresoEgresoState} from '../reducers';


export const IngresoEgresoKey = 'ingresoEgreso';

export const selectIngresoEgresoState = createFeatureSelector<IngresoEgresoState>(IngresoEgresoKey);

export const selectIngresoEgreso = createSelector(
  selectIngresoEgresoState,
  (state: IngresoEgresoState) => state.items
);
