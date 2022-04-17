import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    list: [],
    completed: null,
    active: null,
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

      // completed todo
      const completedList = state.list.filter(
        (todo) => todo.completed === true
      );
      state.completed = completedList;

      // active todo
      const activeList = state.list.filter((todo) => todo.completed === false);
      state.active = activeList;
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload.id);

      state.items--;
    },

    editTodo:(state,action)=>{
      const index = state.list.findIndex(t=>t.id===action.payload.id);
      state.list[index].todo = action.payload.todo;
    }
  },
});

export const { addTodo, toggleComplete, deleteTodo,editTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
