import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiService";

const initialState = {
  videoLoading: false,
  videoErrorMessage: "",
  videoCreatingSuccess: false,
  videoDeleteSuccess: false,
  videoArray:[],
};

// create category
export const createVideo = createAsyncThunk(
  "admin/createVideo",
  async (object, thunkAPI) => {
    //   console.log(object)
    const token = object.token;
    const url = object.url;
   const title=object?.title;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/video`,
        { url,title},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get category
export const getVideo = createAsyncThunk(
  "admin/getVideo",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/video`);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete category

export const deleteVideo = createAsyncThunk(
  "admin/deleteVideo",
  async (object, thunkAPI) => {
    //   console.log(object)
    const id = object.id;
    const token = object.token;

    try {
      const response = await axios.delete(`${BASE_URL}/api/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoReset: (state) => {
      state.videoErrorMessage = "";
      state.videoCreatingSuccess = false;
      state.videoDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideo.pending, (state) => {
       state.videoLoading=true;
       state.videoArray=[];
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.videoLoading=false;
        state.videoArray=action.payload;
        
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.videoLoading=false;
        state.videoArray=[];
       
      })

      // create category
      .addCase(createVideo.pending, (state) => {
         state.videoLoading=true;
         state.videoErrorMessage= "";
         state.videoCreatingSuccess= false;

      })
      .addCase(createVideo.fulfilled, (state, action) => {
       state.videoLoading=false;
       state.videoErrorMessage= "";
       state.videoCreatingSuccess= true;
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.videoLoading=false;
        state.videoErrorMessage= action.payload;
        state.videoCreatingSuccess= false;
      })

      // delete video

      .addCase(deleteVideo.pending, (state) => {
      state.videoLoading=true;
      state.videoDeleteSuccess=false;
      state.videoErrorMessage="";
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videoLoading=false;
        state.videoDeleteSuccess=true;
        state.videoErrorMessage="";
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.videoLoading=false;
        state.videoDeleteSuccess=false;
        state.videoErrorMessage=action.payload;
      });
  },
});

export const { videoReset } = videoSlice.actions;
export default videoSlice.reducer;
