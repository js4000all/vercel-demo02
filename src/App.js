import React from "react";
import Counter from "./Counter";
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <h1>マイアプリ</h1>
      <TodoList />
      <Counter title="カウンター1" />
    </div>
  );
}

export default App;
