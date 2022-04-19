import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    list: [],
    items: 0,
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: uuidv4(),
        todo: action.payload.todo,
        completed: action.payload.completed,
      });
      state.items++;
    },

    toggleComplete: (state, action) => {
      // all todo
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      state.list[index].completed = action.payload.completed;
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload.id);
      state.items--;
    },

    editTodo: (state, action) => {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      state.list[index].todo = action.payload.todo;
    },
  },
});

export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  editTodo,
} = todoListSlice.actions;

export default todoListSlice.reducer;
