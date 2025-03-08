import React, { useState } from "react";

function App() {
  // カウントを保持する state
  const [count, setCount] = useState(0);

  // ボタンが押されたときの処理
  const handleClick = () => {
    setCount(count + 1); // カウントを増やす
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>カウンターアプリ</h1>
      <p>現在のカウント: {count}</p>
      <button onClick={handleClick} style={{ fontSize: "20px", padding: "10px 20px" }}>
        +1 する
      </button>
    </div>
  );
}

export default App;
