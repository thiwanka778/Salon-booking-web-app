import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiService";



const initialState = {
    categoryLoading: false,
    categoryError: false,
    categorySuccess: false,
    categoryErrorMessage: "",
    categoryArray: [],

    categorySaveSuccess:false,
  
  }

// create category
  export const createCategory = createAsyncThunk(
    'admin/createCategory',
    async (object, thunkAPI) => {
    //   console.log(object)
      const token = object.token;
      const categoryUrl = object.categoryUrl;
      const categoryDes = object.categoryDes;
      const categoryTitle = object.categoryTitle;
     
      try {
        const response = await axios.post(`${BASE_URL}/api/category`, { categoryUrl, categoryTitle, categoryDes, }, {
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


  // get category
export const getCategory = createAsyncThunk(
    'admin/getCategory',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/category`);
  
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

  const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      categoryReset: (state) => {
        state.categoryError = false;
        state.categorySuccess = false;
        state.categoryErrorMessage = "";
        state.categorySaveSuccess=false;
  
      },
  
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCategory.pending, (state) => {
           state.categoryLoading=true;
           state.categoryArray= [];
           state.categorySuccess=false;
           state.categoryError=false;
           state.categoryErrorMessage="";
          })
          .addCase(getCategory.fulfilled, (state, action) => {
            state.categoryLoading=false;
            state.categoryArray =action.payload;
            state.categorySuccess=true;
            state.categoryError=false;
            state.categoryErrorMessage="";
          })
          .addCase(getCategory.rejected, (state, action) => {
            state.categoryLoading=false;
            state.categoryArray= [];
            state.categorySuccess=false;
            state.categoryError=true;
            state.categoryErrorMessage=action.payload;
    
          })

          // create category
          .addCase(createCategory.pending, (state) => {
            state.categoryLoading=true;
            state.categoryErrorMessage="";
            state.categorySaveSuccess=false;
           })
           .addCase(createCategory.fulfilled, (state, action) => {
             state.categoryLoading=false;
             state.categoryErrorMessage="";
             state.categorySaveSuccess=true;
           })
           .addCase(createCategory.rejected, (state, action) => {
             state.categoryLoading=false;
             state.categoryErrorMessage=action.payload;
             state.categorySaveSuccess=false;
     
           })

        }
})



export const { categoryReset } = categorySlice.actions;
export default categorySlice.reducer;