import { Counter, TodoList } from "@/components";

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
