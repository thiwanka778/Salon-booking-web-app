import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiService";

const initialState = {
  sliderLoading: false,
  sliderError: false,
  sliderSuccess: false,
  sliderErrorMessage: "",
  slider: [],
  sliderDeleteSuccess: false,
}

// create slider

export const createSlider = createAsyncThunk(
  'admin/createSlider',
  async ({ url, token }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/sliders`, { url }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSlider = createAsyncThunk(
  'admin/getSlider',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/sliders`);

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete slider

export const deleteSlider = createAsyncThunk(
  'admin/deleteSlider',
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/sliders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    sliderReset: (state) => {
      state.sliderError = false;
      state.sliderSuccess = false;
      state.sliderErrorMessage = "";
      state.sliderDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSlider.pending, (state) => {
        state.sliderLoading = true;
        state.sliderError = false;
        state.sliderSuccess = false;
        state.sliderErrorMessage = "";
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.sliderLoading = false;
        state.sliderError = false;
        state.sliderSuccess = true;
        state.sliderErrorMessage = "";
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.sliderLoading = false;
        state.sliderError = true;
        state.sliderSuccess = false;
        state.sliderErrorMessage = action.payload;
      })

      // getSlider
      .addCase(getSlider.pending, (state) => {
        state.sliderLoading = true;
        state.slider = [];
      })
      .addCase(getSlider.fulfilled, (state, action) => {
        state.sliderLoading = false;
        state.slider = action.payload;
      })
      .addCase(getSlider.rejected, (state, action) => {
        state.sliderLoading = false;
        state.slider = [];
      })

      // delete Slider
      .addCase(deleteSlider.pending, (state) => {
        state.sliderLoading = true;
        state.sliderError = false;
        state.sliderErrorMessage = "";
        state.sliderDeleteSuccess = false;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.sliderLoading = false;
        state.sliderError = false;
        state.sliderErrorMessage = "";
        state.sliderDeleteSuccess = true;
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.sliderLoading = false;
        state.sliderError = true;
        state.sliderErrorMessage = action.payload;
        state.sliderDeleteSuccess = false;
      })

  },

})




export const { sliderReset } = sliderSlice.actions;
export default sliderSlice.reducer;
