import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, toggleComplete } from "../redux/TodoListSlice";
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
  const [editIcon, setEditIcon] = useState(false);
  const [edit, setEdit] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [_id, setId] = useState();
  // const dragItem = useRef();
  // const dragOver = useRef()
  const itemLeft = useSelector((state) => state.todo.items);
  const dispatch = useDispatch();

  // toogle completed todo
  const handleChecked = (uid, completed) => {
    console.log("toggled");
    console.log(uid);
    dispatch(toggleComplete({ id: uid, completed: !completed }));
  };

  // delete todo
  const handleDelete = (id) => {
    dispatch(deleteTodo({ id: id }));
    console.log("sdfj");
  };

  // handle edit icon
  const handleEditIcon = () => {
    setEditIcon(!editIcon);
  };

  const showEdit = (id) => {
    setEdit("edit");
    setId(id);
  };


  // drag feature
  // const dragStart = (e,pos)=>{
  //   dragItem.current = pos;
  //   console.log(e.target)
  // }

  // const dragEnter = (e,pos)=>{
  //   dragOver.current = pos;
  //   console.log(e.target.innerHTML)
  // }

  // // reshuffle the list
  // const drop = (e)=>{
  //   const copyListItems = [...todos];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current,1);
  //   copyListItems.splice(dragOver.current,0,dragItemContent);
  //   dragItem.current = null;
  //   dragOver.current = null;
  //   setTodo(copyListItems)

  // }


  useEffect(() => {
    console.log("list", todos);
    if (links.active === false && links.completed === false) {
      setTodo(todoItems);
    } else if (links.active === true && links.completed === false) {
      setTodo(ActiveTodo);
    } else if (links.active === false && links.completed === true) {
      setTodo(completedTodo);
    }
  }, [todoItems, todos, links, completedTodo, ActiveTodo, edit]);

  return (
    <div className="todo__card">
      <div className="todo__wrapper">
        <div className="drag-n-drop">
          <div className="dnd-group">
            {todos !== undefined &&
              todos !== null &&
              todos.map((t, index) => (
                // draggble item

                <div
                  className={"todo__list"}
                  key={t.id}
                  // draggable
                  // onDragStart={(e) => dragStart(e, index)}
                  // onDragEnter={e=>dragEnter(e,index)}
                  // onDragEnd={drop}
                  // onDragOver={e=>e.preventDefault()}
                >
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
                      {edit === "edit" && t.id === _id && editIcon ? (
                        <input
                          className="isEditing"
                          type="text"
                          defaultValue={t.todo}
                          onChange={(e) => setEditedTodo(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              dispatch(
                                editTodo({ id: t.id, todo: editedTodo })
                              );
                              setEdit("");
                            }
                          }}
                        />
                      ) : (
                        <p>{t.todo}</p>
                      )}
                    </div>
                  </div>
                  <div className="cross">
                    {editIcon ? (
                      <MdModeEdit
                        size={20}
                        style={{ color: "#dea40d" }}
                        onClick={() => showEdit(t.id)}
                      />
                    ) : (
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
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* bottom links */}
        <div className="todo__list todo_list2">
          {/* large screen footer */}
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

            <div className="item2">
              <p onClick={handleEditIcon}>{editIcon ? "Close" : "Edit todo"}</p>
            </div>
          </div>
        </div>
      </div>
      {/* small screen footer */}
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
