import React, { useState, useEffect } from "react";

function Counter() {
  const MIN_COUNT = 0;

  const initialState = JSON.parse(localStorage.getItem("counterData")) || { count: 0, maxCount: 10 };

  const [count, setCount] = useState(initialState.count);
  const [maxCount, setMaxCount] = useState(initialState.maxCount);

  useEffect(() => {
    localStorage.setItem("counterData", JSON.stringify({ count, maxCount }));
  }, [count, maxCount]);

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
  const changeMaxCount = (event) => {
    const newMax = parseInt(event.target.value, 10);
    setMaxCount(newMax);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>カウンター</h1>
      <p>v0.0.1</p>
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
      <hr />
      <div style={{ marginTop: "20px" }}>
        <label>上限値を設定: </label>
        <input
          type="number"
          value={maxCount}
          onChange={changeMaxCount}
          style={{ fontSize: "16px", padding: "5px", width: "80px", textAlign: "center" }}
        />
      </div>
    </div>
  );
}

export default Counter;
