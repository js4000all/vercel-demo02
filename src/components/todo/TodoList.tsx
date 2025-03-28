import React, { useState, useEffect } from "react";
import { StorageKey, IStorage } from "@/interfaces";

export const STORAGE_KEY: StorageKey = { name: "todoList.json"};

interface Task {
  content: string;
}

interface Props {
  storage: IStorage;
}

const TodoList: React.FC<Props> = ({ storage }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    storage.load(STORAGE_KEY)
    .then((tasks_json) => {
      if (tasks_json !== null) {
        setTasks(JSON.parse(tasks_json));
      }
    })
    .catch((err) => {
      console.error("ストレージからの読み込みに失敗しました:", err);
    })
    .finally(() => {
      setLoaded(true); // 成功・失敗問わずロード完了
    });
  }, []);

  useEffect(() => {
    if(loaded){
      storage.save(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, {content: input}]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteAllTasks = () => {
    if (tasks.length === 0) return; // タスクがない場合は何もしない
    const isConfirmed = window.confirm("すべてのタスクを削除しますか？");
    if (isConfirmed) {
      setTasks([]);
    }
  };

  if (!loaded) return <div>読み込み中...</div>;

  return (
    <div>
      <h2>Todoリスト</h2>
      <p>v0.0.1</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <button onClick={addTask}>追加</button>
      <button onClick={deleteAllTasks} disabled={tasks.length === 0}>
        全削除
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.content} <button
                data-testid={`delete-${index}`}
                onClick={() => deleteTask(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
