import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, userReducer } from "."

const store = configureStore({
    reducer:{
        user :userReducer,
        profile:profileReducer
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch