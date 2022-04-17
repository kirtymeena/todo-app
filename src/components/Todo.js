import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../redux/themeSlice";
import { addTodo } from "../redux/TodoListSlice";
import TodoList from "./TodoList";

const Todo = () => {
  const [todo, setTodo] = useState({ todo: "", completed: null });
  const [keyPressed, setKeyPressed] = useState(false);
  const dispatch = useDispatch();
  const t = useSelector((state) => state.theme.theme);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo) {
      dispatch(
        addTodo({
          todo: todo.todo,
          completed: todo.completed,
        })
      );
    }
  };

  useEffect(() => {
    if (keyPressed === true) {
      setTodo({ todo: "" ,completed:false});
    }
  }, [keyPressed, todo]);
  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h1>TODO</h1>
        </div>

        <div className="theme__button">
          {t === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              onClick={() => dispatch(lightTheme({ theme: "light" }))}
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              onClick={() => dispatch(darkTheme({ theme: "dark" }))}
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="card__wrapper">
        <div className="card__top">
          <div className="ring"></div>
          <form onSubmit={handleSubmit}>
            <input
              value={todo.todo}
              onChange={(e) =>
                setTodo({ todo: e.target.value, completed: false })
              }
              type="text"
              id="input-box"
              placeholder="Create a new todo..."
              onKeyPress={(e) =>
                e.key === "Enter" ? setKeyPressed(true) : setKeyPressed(false)
              }
            />
          </form>
        </div>
        <div className="card__todo__list">
          <TodoList />

          {/* <footer>footer</footer> */}
        </div>
        <div className="bottom__container">
          <div className="bottom__wrapper">
           
            <div className="bottom__text">
              <p>Drag and drop to reorder list</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
