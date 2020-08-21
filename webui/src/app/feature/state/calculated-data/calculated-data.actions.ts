import { createAction, props } from '@ngrx/store';
import { INewCalculationType, INewRowData } from './calculated-data.models';

export const tableCalculation = createAction('[Feature Module] Table calculation', props<INewCalculationType>());
export const newCalculatedData = createAction('[Feature Module] Table got new calculation', props<INewRowData>());
