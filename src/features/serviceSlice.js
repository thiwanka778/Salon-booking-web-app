import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiService";

const initialState = {
  serviceLoading: false,
  serviceError: false,
  serviceSuccess: false,
  serviceErrorMessage: "",
  service: null,
  serviceUpdateSuccess: false,
  serviceDeleteSuccess:false,

}
// create services
export const createService = createAsyncThunk(
  'admin/createService',
  async (object, thunkAPI) => {
    //console.log(object)
    const token = object.token;
    const url = object.url;
    const des = object.des;
    const title = object?.title.trim();
    const categoryId=object?.categoryId;
    const price = object.price;
    const category = object?.category.toLowerCase().trim();
    const estimatedTime=object.estimatedTime;
    try {
      const response = await axios.post(`${BASE_URL}/api/service`, { url, title, des, price, categoryId,estimatedTime, }, {
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

// get services
export const getServices = createAsyncThunk(
  'admin/getServices',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/service`);

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
// delete service

export const deleteService = createAsyncThunk(
  'admin/deleteService',
  async ({token,id}, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/service/${id}`,{
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

// update Service
export const updateService = createAsyncThunk(
  'admin/updateServices',
  async (object, thunkAPI) => {
    const token = object.token;
    const url = object.url;
    const des = object.des;
    const title = object.title.trim();
    const price = object.price;
    const category = object.category;
    const categoryId=object?.categoryId;
    const id=object.id;
    const estimatedTime=object.estimatedTime;
    try {
      const response = await axios.put(`${BASE_URL}/api/service/${id}`, {url,des,title,price,categoryId,estimatedTime},
        {
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


const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    serviceReset: (state) => {
      state.serviceError = false;
      state.serviceSuccess = false;
      state.serviceErrorMessage = "";
      state.serviceUpdateSuccess = false;
      state.serviceDeleteSuccess=false;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.serviceLoading = true;
        state.serviceError = false;
        state.serviceSuccess = false;
        state.serviceErrorMessage = "";
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.serviceError = false;
        state.serviceSuccess = true;
        state.serviceErrorMessage = "";
      })
      .addCase(createService.rejected, (state, action) => {
        state.serviceLoading = false;
        state.serviceError = true;
        state.serviceSuccess = false;
        state.serviceErrorMessage = action.payload;

      })

      // get services

      .addCase(getServices.pending, (state) => {
        state.serviceLoading = true;
        state.service = null;

      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.service = action.payload;

      })
      .addCase(getServices.rejected, (state, action) => {
        state.serviceLoading = false;
        state.service = null;

      })


      // update service 
      .addCase(updateService.pending, (state) => {
        state.serviceLoading = true;
        state.serviceUpdateSuccess = false;
         state.serviceErrorMessage="";

      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.serviceUpdateSuccess = true;
        state.serviceErrorMessage="";

      })
      .addCase(updateService.rejected, (state, action) => {
        state.serviceLoading = false;
        state.serviceUpdateSuccess = false;
      
        state.serviceErrorMessage=action.payload;

      })

      // delete service

      .addCase(deleteService.pending, (state) => {
        state.serviceLoading = true;
         state.serviceErrorMessage="";
         state.serviceDeleteSuccess=false;

      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.serviceErrorMessage="";
        state.serviceDeleteSuccess=true;

      })
      .addCase(deleteService.rejected, (state, action) => {
        state.serviceLoading = false;
        state.serviceErrorMessage=action.payload;
        state.serviceDeleteSuccess=false;

      })






  },


})

export const { serviceReset } = serviceSlice.actions;
export default serviceSlice.reducer;