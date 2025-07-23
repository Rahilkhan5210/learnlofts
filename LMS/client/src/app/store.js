import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";  // Ensure rootReducer has all necessary reducers
import { authApi } from "../Features/Api/authApi.js";
import { courseApi } from "@/Features/Api/courseApi.js";
import { purchaseApi } from "@/Features/Api/purchaseApi.js";
import { courseProgressApi } from "@/Features/Api/courseProgressApi.js";
import { certificationApi } from "@/Features/Api/certificationsApi.js";
import { blogsApi } from "@/Features/Api/blogsApi.js";

export const appStore = configureStore({
  reducer: rootReducer,  // Include the combined reducer
  middleware: (defaultMiddleware) => 
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware,
      certificationApi.middleware, // Add certification API middleware for API calls
      blogsApi.middleware // Add blogs API middleware for API calls
    ),
});

// Initialize app
const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

initializeApp(); // Ensure the user is loaded when the app starts
