import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from '@redux-devtools/extension';
import {
  persistsReconciler,
  PersistTransform,
  ReduxBuilder,
  ReduxStoreStateTemplate,
  createSagaHelper,
  createRootSaga,
} from 'obrigado-redux-utils';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  transforms: [
    PersistTransform({
      whitelist: [],
    }),
  ],
  stateReconciler: persistsReconciler,
};

const sagaModules = {};

type Data = {
  linkPath: Array<string>;
};

const data = {
  linkPath: [],
};
// Use this type inside selectors
export type ReduxStoreState = ReduxStoreStateTemplate<Data>;
const builder = new ReduxBuilder(data);
const reducer = builder.createReducer();
const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = __DEV__
  ? createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
    )
  : createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// @ts-ignore
sagaMiddleware.run(createRootSaga(sagaModules));

// @ts-ignore
export const persist = persistStore(store);
export const ReduxHelper = builder.createReduxHelper(store);
export const SagaHelper = createSagaHelper(sagaModules, store);
