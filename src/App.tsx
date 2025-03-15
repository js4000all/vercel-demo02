import { Counter, TodoList } from "@/components";
import { LocalStorage } from "./storage";

function App() {
  return (
    <div>
      <h1>マイアプリ</h1>
      <TodoList storage={new LocalStorage()} />
      <Counter title="カウンター1" storage={new LocalStorage()} />
    </div>
  );
}

export default App;
