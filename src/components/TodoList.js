import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleComplete } from "../redux/TodoListSlice";
import { MdModeEdit } from "react-icons/md";

const TodoList = () => {
  const todoItems = useSelector((state) => state.todo.list);
  const completedTodo = useSelector((state) => state.todo.completed);
  const ActiveTodo = useSelector((state) => state.todo.active);
  const [todos, setTodo] = useState();
  const [links, setLinks] = useState({
    active: false,
    completed: false,
    all: false,
  });

  const itemLeft = useSelector((state) => state.todo.items);
  const dispatch = useDispatch();

  const handleChecked = (uid, completed) => {
    console.log("toggled");
    console.log(uid);
    dispatch(toggleComplete({ id: uid, completed: !completed }));
  };
  const handleDelete = (id) => {
    dispatch(deleteTodo({ id: id }));
    console.log("sdfj");
  };

  useEffect(() => {
    console.log("completed", todos);
    if (links.active === false && links.completed === false) {
      setTodo(todoItems);
    }
  }, [todoItems, todos, links,completedTodo,ActiveTodo]);

  return (
    <div className="todo__card">
      <div className="todo__wrapper">
        <div className="drag-n-drop">
          <div className="dnd-group">
            {todos !== undefined &&
              todos.map((t) => (
                // draggble item

                <div className={"todo__list"} key={t.id}>
                  {/* checkbox */}
                  <div className="checkbox__btn">
                    <input
                      id={`checkbox${t.id}`}
                      type="checkbox"
                      defaultChecked={t.completed === true ? true : false}
                      onClick={() => handleChecked(t.id, t.completed)}
                    />
                    <label htmlFor={`checkbox${t.id}`}></label>
                  </div>

                  <div className="todo__task">
                    <div
                      className={`text__wrap ${t.completed ? "checked" : ""}`}
                    >
                      <p>{t.todo}</p>
                      
                    </div>
                  </div>
                  <div className="cross">
                    {/* <MdModeEdit size={20}/> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      onClick={() => handleDelete(t.id)}
                    >
                      <path
                        fill="#494C6B"
                        fillRule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* bottom links */}
        <div className="todo__list todo_list2">
          <div className="footer1">
            <div className="item1">
              <p>{itemLeft} items left</p>
            </div>
            <div className="middle__items">
              <div>
                <p
                  onClick={() => {
                    setTodo(todoItems);
                    setLinks({ active: false, completed: false, all: true });
                  }}
                  style={{
                    color: links.all === true ? "hsl(220, 98%, 61%)" : "",
                  }}
                >
                  All
                </p>
              </div>
              <div>
                <p
                  onClick={() => {
                    setTodo(ActiveTodo);
                    setLinks({ active: true, completed: false, all: false });
                  }}
                  style={{
                    color: links.active === true ? "hsl(220, 98%, 61%)" : "",
                  }}
                >
                  Active
                </p>
              </div>
              <div>
                <p
                  onClick={() => {
                    setLinks({ active: false, completed: true, all: false });
                    setTodo(completedTodo);
                  }}
                  style={{
                    color: links.completed === true ? "hsl(220, 98%, 61%)" : "",
                  }}
                >
                  Completed
                </p>
              </div>
            </div>
            {/* <div className="middleItems_mobile">
              
            </div> */}
            <div className="item2">
              <p>Close Completed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__mobile">
        <div>
          <p
            onClick={() => {
              setTodo(todoItems);
              setLinks({ active: false, completed: false, all: true });
            }}
            style={{
              color: links.all === true ? "hsl(220, 98%, 61%)" : "",
            }}
          >
            All
          </p>
        </div>
        <div>
          <p
            onClick={() => {
              setTodo(ActiveTodo);
              setLinks({ active: true, completed: false, all: false });
            }}
            style={{
              color: links.active === true ? "hsl(220, 98%, 61%)" : "",
            }}
          >
            Active
          </p>
        </div>
        <div>
          <p
            onClick={() => {
              setLinks({ active: false, completed: true, all: false });
              setTodo(completedTodo);
            }}
            style={{
              color: links.completed === true ? "hsl(220, 98%, 61%)" : "",
            }}
          >
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
