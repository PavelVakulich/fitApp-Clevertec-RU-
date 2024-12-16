import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authorizeApi } from './API/authorizeApi';
import authReducer from '@redux/authSlice';
import loaderReducer from '@redux/loaderSlice';
import siderReducer from '@redux/siderSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        [authorizeApi.reducerPath]: authorizeApi.reducer,
        router: routerReducer,
        auth: authReducer,
        loader: loaderReducer,
        sider: siderReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authorizeApi.middleware, routerMiddleware),
});

export const history = createReduxHistory(store);

// refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
