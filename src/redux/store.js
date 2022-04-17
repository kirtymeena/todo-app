import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import TodoListReducer from "./TodoListSlice";
const store = configureStore({
    reducer:{
        theme:themeReducer,
        todo:TodoListReducer
    }
})

export default store;