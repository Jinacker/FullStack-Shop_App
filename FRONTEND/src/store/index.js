import { combineReducers, configureStore } from "@reduxjs/toolkit"; // api 이용
import  userReducer from "./userSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, } from "redux-persist";

//npm install redux-persist 패키지 설치

const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = ({
    key: "root",
    storage
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});
  

export const persistor = persistStore(store);