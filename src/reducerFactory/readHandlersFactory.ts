import { ReducersMapObject } from 'redux';

import { READ, READ_BATCH } from 'constantFactory';
import { formatEntity, formatEntities } from 'crudEntity';
import { IReadEntityAction, IReadEntitiesBatchAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function readHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [READ(ENTITY).FINISH](state: CrudState, action: IReadEntityAction): CrudState {
      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },

    [READ_BATCH(ENTITY).FINISH](state: CrudState, action: IReadEntitiesBatchAction): CrudState {
      return state
        .mergeIn(['value'], formatEntities(action.payload));
    },
  };
}