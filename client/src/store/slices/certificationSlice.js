import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCertifications = createAsyncThunk(
  'certifications/fetchCertifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/certifications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCertificationById = createAsyncThunk(
  'certifications/fetchCertificationById',
  async (certificationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/certifications/${certificationId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCertification = createAsyncThunk(
  'certifications/verifyCertification',
  async (certificationId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/certifications/${certificationId}/verify`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  certifications: [],
  currentCertification: null,
  loading: false,
  error: null,
};

const certificationSlice = createSlice({
  name: 'certifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.loading = false;
        state.certifications = action.payload;
      })
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch certifications';
      })
      .addCase(fetchCertificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCertification = action.payload;
      })
      .addCase(fetchCertificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch certification details';
      })
      .addCase(verifyCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCertification.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentCertification) {
          state.currentCertification.verified = true;
        }
      })
      .addCase(verifyCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to verify certification';
      });
  },
});

export const { clearError } = certificationSlice.actions;
export default certificationSlice.reducer; 