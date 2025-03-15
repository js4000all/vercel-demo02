import { Counter, TodoList } from "@/components";
import { LocalStorage, VercelBlobStorage } from "./storage";

function App() {
  return (
    <div>
      <h1>マイアプリ</h1>
      <TodoList storage={new VercelBlobStorage()} />
      <Counter title="カウンター1" storage={new LocalStorage()} />
    </div>
  );
}

export default App;
