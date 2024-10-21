import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import UserReducer from './UserSlice'

const persistConfig ={
    key:'root',
    version:1,
    storage,
}

const rootReducer = combineReducers({
   userdata:UserReducer
})

const PersistedReducer = persistReducer(persistConfig,rootReducer)


const appStore = configureStore({
    reducer: PersistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
  });

const persist=persistStore(appStore)

export {persist,appStore}