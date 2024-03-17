
import citizensReducer from './slices/citizensSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { citizensApi } from './api/citizensApi';




const rootReducers=combineReducers({
    citizens:citizensReducer,
    [citizensApi.reducerPath]:citizensApi.reducer,
});

const store=configureStore({
    reducer:rootReducers,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(
        citizensApi.middleware,
    )
});

export default store;