import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:{
        theme:"dark",
    },
    reducers:{
        darkTheme:(state,action)=>{
            state.theme = action.payload.theme;
           
        },
        lightTheme:(state,action)=>{
            state.theme = action.payload.theme    ;
            
        }

    }
})

export const {darkTheme,lightTheme} =  themeSlice.actions;
export  default themeSlice.reducer;