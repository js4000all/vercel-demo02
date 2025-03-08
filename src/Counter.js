import React, { useState, useEffect } from "react";
import RadioGroup from "./RadioGroup";

function Counter({title}) {
  const initialState = JSON.parse(localStorage.getItem("counterData")) || { count: 0, maxCount: 10 };

  const [count, setCount] = useState(initialState.count);
  const [minCount, setMinCount] = useState(0);
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
    if(count > minCount){
      setCount(count - 1);
    }
  };
  const resetCount = () => {
    setCount(0);
  };
  const changeMaxCount = ({target}) => {
    const newMax = parseInt(target.value, 10);
    setMaxCount(newMax);
  };
  const changeMinCount = ({target}) => {
    const newMin = parseInt(target.value, 0);
    setMinCount(newMin);
    if (count < newMin) {
      setCount(newMin);
    }
  }

  return (
    <div style={{
      textAlign: "center", 
      marginTop: "20px",
      border: "2px solid #555", /* 枠線を濃くする */
      padding: "20px", 
      borderRadius: "10px",
      backgroundColor: "#f8f8f8" /* 背景色を少しグレーに */  
      }}>
      <h2>{title}</h2>
      <p>v0.0.2</p>
      <div>
        現在のカウント: {count} ({minCount}-{maxCount})
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
      <RadioGroup
        label="下限値を選択:"
        options={[
          { value: 0, label: "0" },
          { value: 5, label: "5" },
          { value: 10, label: "10" }
        ]}
        selectedValue={minCount}
        onChange={changeMinCount}
      />
    </div>
  );
}

export default Counter;
