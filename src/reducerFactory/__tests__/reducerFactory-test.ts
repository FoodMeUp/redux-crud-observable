import { Reducer } from 'redux';
import { INIT_STORE } from 'constantFactory';

import { CrudState } from '../interfaces';
import crudReducerFactory from '../reducerFactory';

describe('Crud Reducer Factory', () => {
  const ENTITY = 'NINJA';

  it('throws an error if the factory has invalid arguments', () => {
    expect(() => crudReducerFactory(<any>undefined))
      .toThrowError('ENTITY is missing');
  });

  it('creates a crud reducer', () => {
    const reducer = crudReducerFactory(ENTITY);

    expect(reducer).toBeDefined();
  });

  it('upgrades the initial reducer state', () => {
    const initialState = {
      myPadawan: 'Anakin',
    };

    const reducer = crudReducerFactory(ENTITY, initialState);
    const state = reducer(<any>undefined, <any>undefined);

    expect(state.get('totalCount')).toEqual(0);
    expect(state.get('value').toJS()).toEqual({});
    expect(state.get('myPadawan')).toEqual('Anakin');
  });

  it('upgrades the reducer reducers', () => {
    const actionType = 'ACTION_TYPE';
    const actionPayload = 5;
    const reducersMap = {
      [actionType]: (state: any, action: any) => state.setIn(['value'], action.payload),
    };

    const reducer = crudReducerFactory(ENTITY, undefined, reducersMap);

    const state = reducer(<any>undefined, {
      payload: actionPayload,
      type: actionType,
    });

    expect(state.get('value')).toEqual(actionPayload);
  });

  describe('with a CRUD reducer', () => {
    let reducer: Reducer<CrudState>;

    beforeEach(() => {
      reducer = crudReducerFactory(ENTITY);
    });

    it('inits the reducer store', () => {
      const now = new Date();
      const action = {
        payload: { now },
        type: INIT_STORE(ENTITY),
      };

      const state = reducer(<any>undefined, action);

      expect(state.get('bootTime')).toEqual(now);
    });
  });
});


