import { configureStore } from "@reduxjs/toolkit"; // api 이용
import { userReducer } from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})