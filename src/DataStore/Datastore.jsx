import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slice/Authslice"

const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store