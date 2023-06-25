import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiService";


const localUser=window.localStorage.getItem("user")

const initialState={
    isLoading:false,
    user:localUser?JSON.parse(localUser):null,
    isSuccess:false,
    isError:false,
    errorMessage:"",
    isAthenticating:false,

    screen:window.innerWidth,
    successMessage:"",

    open:false,

    stayLoginPage:false,
}



// user Registration
export const userRegister = createAsyncThunk(
  "user/register",
  async ({ email, firstName, lastName, phoneNumber, userType, password }, thunkAPI) => {
    
    try {
      const response = await axios.post(`${BASE_URL}/api/user`, {
        email,
        firstName,
        lastName,
        phoneNumber,
        userType,
        password,
      });

      return response.data;
    } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message)|| error.message || error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// user Login

export const userLogin = createAsyncThunk(
  "user/Login",
  async ({ email,  password }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message)|| error.message || error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// user Email check 

export const userEmailCheck = createAsyncThunk(
  'user/emailCheck',
  async ({email}, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/check/email`, {email});

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


// update user password in forgot password section 
export const updateUserPassword = createAsyncThunk(
  'user/updatePassword',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/user/update/password`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//  get users
export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ token }, thunkAPI) => {
  // console.log(thunkAPI.getState()?.user?.user?.token)
    try {
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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






const userSlice = createSlice({
  name: "user",
 initialState,
  reducers: {
   
    reset:(state)=>{
      state.isError=false;
      state.isSuccess=false;
      state.errorMessage="";
      state.successMessage="";
      
    },
    getScreenWidth:(state,action)=>{
      state.screen=action.payload;
    },
    userLogout:(state)=>{
      state.isError=false;
      state.isSuccess=false;
      state.isLoading=false;
      state.errorMessage="";
      state.user=null;
      state.successMessage="";
      window.localStorage.setItem("user",JSON.stringify(state.user))
    },
    openModal:(state)=>{
      state.open=true;
    },
    closeModal:(state)=>{
      state.open=false;
    },
    whiteNeededPage:(state)=>{
      state.stayLoginPage=true;
    },
    whiteNotNeededPage:(state)=>{
      state.stayLoginPage=false;
    }
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.errorMessage="";
        state.isSuccess=false;
        state.isError=false;
      
       
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.isLoading = false;
        state.isSuccess=true;
        state.errorMessage="";
        state.isError=false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError=true;
        state.errorMessage=action.payload;
       state.isSuccess=false;
      })
      // user login

      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage="";
        state.isSuccess=false;
        state.isError=false;
        state.user=null;
       
      })
      .addCase(userLogin.fulfilled, (state, action) => {
       // console.log(action.payload)
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess=true;
        state.errorMessage="";
        state.isError=false;
        window.localStorage.setItem("user",JSON.stringify(state.user))
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError=true;
        state.errorMessage=action.payload;
       state.isSuccess=false;
       state.user=null;
      })

      // check user email

      .addCase(userEmailCheck.pending, (state) => {
        state.isLoading = true;
        state.errorMessage="";
        state.isSuccess=false;
        state.isError=false;
       
       
      })
      .addCase(userEmailCheck.fulfilled, (state, action) => {
       // console.log(action.payload)
        state.isLoading = false;
        state.isSuccess=true;
        state.errorMessage="";
        state.isError=false;
        
      })
      .addCase(userEmailCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError=true;
        state.errorMessage=action.payload;
       state.isSuccess=false;
    
      })

      // update user password in forgot password section 

      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.errorMessage="";
       state.successMessage="";
       
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
       // console.log(action.payload)
        state.successMessage=action?.payload?.message;
        state.isLoading = false;
        state.errorMessage="";
        
        
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage=action.payload;
        state.successMessage="";
      
    
      })

      // get user with token

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage="";
       state.isError=false;
       state.isSuccess=false;
       
      })
      .addCase(getUser.fulfilled, (state, action) => {
       // console.log(action.payload)
      
        state.isLoading = false;
        state.errorMessage="";
        state.isError=false;
        state.isSuccess=true;
        
        
      })
      .addCase(getUser.rejected, (state, action) => {
      //  console.log("getuser",action.payload)
        state.isLoading = false;
        state.errorMessage=action.payload;
        state.isError=true;
        state.isSuccess=false;
      
    
      })




  },



});

export const { reset, getScreenWidth,userLogout,openModal,closeModal,whiteNeededPage,whiteNotNeededPage} = userSlice.actions;

export default userSlice.reducer;
