"use client"

import {configureStore,combineReducers} from '@reduxjs/toolkit';
import  {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {useDispatch,useSelector,TypedUseSelectorHook, Provider} from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { useRef } from 'react';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from "@/state/userSlice";


const rootReducer = combineReducers({
    user:userReducer
})

const PersistConfig = {
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(PersistConfig,rootReducer);
export const store = () =>{
    return configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false})
})
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;


export default function StoreProvider({children}:{children:React.ReactNode}){
    const storeRef = useRef<AppStore>();
    if(!storeRef.current){
       storeRef.current = store();
       setupListeners(storeRef.current.dispatch)
    }

    const persistor = persistStore(storeRef.current)

    return(
     <Provider store={storeRef.current}>
         <PersistGate loading={null} persistor={persistor}>
            {children}
         </PersistGate>
     </Provider>
    )
}
