import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
// import statusSlice from './slice/statusSlice';
// import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from './services_saga/rootSaga';

let enhancers: any[] = [];
// const createSagaMiddleware = require('redux-saga').default;
// let sagaMiddleware: any;
let middleware: any[] = [];

if (__DEV__) {
    const reactotron = require('../config/ReactotronConfig').default;
    enhancers.push(reactotron.createEnhancer());
    // const sagaMonitor = reactotron.createSagaMonitor();

    // sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    // middleware.push(sagaMiddleware);
} else {
    // sagaMiddleware = createSagaMiddleware();
    // middleware.push(sagaMiddleware);
}

export const store = configureStore({
    reducer: {
        userSlice: userSlice,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(enhancers),
});

// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;