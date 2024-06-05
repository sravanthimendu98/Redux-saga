import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import myFirstReducer from './reducers';
import mySaga from './saga/Saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    myFirstReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(mySaga);
export default store;
