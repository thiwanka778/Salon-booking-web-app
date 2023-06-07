import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sliderLoading: false,
  sliderError: false,
  sliderSuccess: false,
  sliderErrorMessage: "",
  slider: null,
  sliderDeleteSuccess: false,
}

// create slider

export const createSlider = createAsyncThunk(
  'admin/createSlider',
  async ({ url, token }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/sliders', { url }, {
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
      const response = await axios.get('http://localhost:8000/api/sliders');

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
      const response = await axios.delete(`http://localhost:8000/api/sliders/${id}`, {
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
        state.slider = null;
      })
      .addCase(getSlider.fulfilled, (state, action) => {
        state.sliderLoading = false;
        state.slider = action.payload;
      })
      .addCase(getSlider.rejected, (state, action) => {
        state.sliderLoading = false;
        state.slider = null;
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
