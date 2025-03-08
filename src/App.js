import React, { useState } from "react";

function App() {
  const MIN_COUNT = 0;

  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(10);

  const incrementCount = () => {
    if(count < maxCount){
      setCount(count + 1);
    }
  };
  const decrementCount = () => {
    if(count > MIN_COUNT){
      setCount(count - 1);
    }
  };
  const resetCount = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>カウンターアプリ</h1>
      <p>v0.0.5</p>
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
