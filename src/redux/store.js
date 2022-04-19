import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import TodoListReducer from "./TodoListSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

  const persistConfig = {
      key:'root',
      version:1,
      storage
  }


  const rootReducer = combineReducers({
    theme:themeReducer,
    todo:TodoListReducer
  })

  const persistedReducer = persistReducer(persistConfig,rootReducer)

  export const store = configureStore({
      reducer:persistedReducer,
      middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
          serializableCheck:{
              ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
          }
      })
  })
// const store = configureStore({
//     reducer:{
//         theme:themeReducer,
//         todo:TodoListReducer
//     }
// })

// export default store;

export let persistor = persistStore(store)