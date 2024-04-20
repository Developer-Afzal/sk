import { createSlice,  } from "@reduxjs/toolkit";

const initialState = 
    {UserToken:null}



export const Login = createSlice ({
    name:'Auth',
    initialState,
    reducers:{
        GetLogin:(state, action)=>{
            state.UserToken = action.payload
        },

        GetLogout:(state, acion)=>{
            state.UserToken = null
        }
    }
})

export const {GetLogin, GetLogout} = Login.actions;
export default Login.reducer