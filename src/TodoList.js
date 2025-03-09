import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
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
            {task} <button
                data-testid={`delete-${index}`}
                onClick={() => deleteTask(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
