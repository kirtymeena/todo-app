import { useState } from "react";
import Todo from "./components/Todo";
import { useSelector } from "react-redux";



function App() {
  const themes = useSelector((state) => state.theme.theme);

  useState(() => {
  }, [themes]);

  return (
    <main className={`container ${themes}`}>
      <div className="track-1">
        <Todo />
      </div>
      <div className="track-2">
        {/* <button onClick={darkTheme}>dark</button>
      <button onClick={lightTheme}>light</button> */}
      </div>
    </main>
  );
}

export default App;
