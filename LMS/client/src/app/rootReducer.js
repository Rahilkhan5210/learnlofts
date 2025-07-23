import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice.js";
import { authApi } from "../Features/Api/authApi.js";
import { courseApi } from "../Features/Api/courseApi.js";
import { purchaseApi } from "../Features/Api/purchaseApi.js";
import { courseProgressApi } from "../Features/Api/courseProgressApi.js";
import { certificationApi } from "../Features/Api/certificationsApi.js";  // Correct import path
import { blogsApi } from "../Features/Api/blogsApi.js";

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    [certificationApi.reducerPath]: certificationApi.reducer,  // Added certification API
    [blogsApi.reducerPath]: blogsApi.reducer,  // Added blogs API
});

export default rootReducer;
