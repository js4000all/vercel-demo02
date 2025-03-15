import React, { useState, useEffect } from "react";

export const LOCAL_STORAGE_KEY = "todoList";

interface Task {
  content: string;
}

function TodoList() {
  const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");

  const [tasks, setTasks] = useState<Task[]>(initialState);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
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
