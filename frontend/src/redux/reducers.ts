import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USER, logInThunk, userInitialState,PROFILE,profilesInitialState, getProfile, addProfile } from ".";

const userSlice = createSlice({
  name: USER,
  initialState: userInitialState,
  reducers: {
    expireUser: (state) => {
      state.name = "";
    },
    clearLogInError(state) {
      state.loginError = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.name = action.payload.data.name;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      state.loginError = action.error.message || "Something went wrong";
      state.name = "";
    });
  },
});

const profileSlice = createSlice({
  name:PROFILE,
  initialState:profilesInitialState,
  reducers:{
    setShowModel(state,action:PayloadAction<boolean>){
      state.showModel = action.payload;
    }
  },
  extraReducers(builder) {
      builder.addCase(getProfile.fulfilled,(state,action)=>{
          state.value = action.payload
      })
      builder.addCase(getProfile.rejected,(state,action)=>{
          state.error = action.error.message!
      })
      builder.addCase(addProfile.fulfilled,(state,action)=>{
          state.value = [...state.value,action.payload]
      })
      builder.addCase(addProfile.rejected,(state,action)=>{
          state.error = action.error.message!
      })
  },
})



export const userReducer = userSlice.reducer;
export const profileReducer = profileSlice.reducer
export const { expireUser, clearLogInError } = userSlice.actions;
export const { setShowModel } = profileSlice.actions;