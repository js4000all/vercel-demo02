import { Counter, TodoList } from "@/components";
import { getStorage, LocalStorage } from "./storage";

function App() {
  const cloudStorage = getStorage();
 
  return (
    <div>
      <h1>マイアプリ</h1>
      <TodoList storage={cloudStorage} />
      <Counter title="カウンター1" storage={new LocalStorage()} />
      </div>
  );
}

export default App;
