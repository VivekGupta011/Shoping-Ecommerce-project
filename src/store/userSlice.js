import { createSlice } from "@reduxjs/toolkit";
import {API} from "./../utils/apiURL";
import axios from 'axios';

const userSlice = createSlice({
  name : 'user',
  initialState : {
    isLoggedIn : false
  },
  reducers : {
    setAuthenication(state,action){
      state.isLoggedIn = action.payload;
    }
  }
})

export const {setAuthenication} = userSlice.actions;

export const isAuthenticated = () =>{
  return async (dispatch) => {
    axios.get(`/auth`,{withCredentials:true}).then((res)=>{
      if(res.status===200){
        if(res.data.authorized)
          dispatch(setAuthenication(true));
        else
          dispatch(setAuthenication(false));
      }
    }).catch(err=>console.log(err));
  }
}
export const logout = () => {
  return async function logOutThunk(dispatch){
    axios.get(`/logout`,{withCredentials:true}).
    then(res=>{
      if(res.status===200){
        console.log("Logged out");
        dispatch(setAuthenication(false));
      }
    }).catch(err=>{
      console.log(err);
    })
  }
}

export default userSlice.reducer;