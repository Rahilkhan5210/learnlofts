import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import certificationReducer from './slices/certificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    certifications: certificationReducer,
  },
}); 