import React, { useState } from "react";

function App() {
  // カウントを保持する state
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    setCount(count - 1);
  };
  const resetCount = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>カウンターアプリ</h1>
      <p>現在のカウント: {count}</p>
      <button onClick={incrementCount} style={{ fontSize: "20px", padding: "10px 20px" }}>
        +1 する
      </button>
      <button onClick={decrementCount} style={{ fontSize: "20px", padding: "10px 20px" }}>
        -1 する
      </button>
      <button onClick={resetCount} style={{ fontSize: "20px", padding: "10px 20px" }}>
        RESET
      </button>
    </div>
  );
}

export default App;
