import React, { useState, useEffect } from "react";
import { RadioGroup } from "@/shared/ui";
import { StorageKey, IStorage } from "@/interfaces";

export const STORAGE_KEY: StorageKey = { name: "counterData" };

interface CounterProps {
  title: string;
  storage: IStorage;
}

const Counter: React.FC<CounterProps> = ({title, storage}) => {
  const [count, setCount] = useState(0);
  const [minCount, setMinCount] = useState(0);
  const [maxCount, setMaxCount] = useState(5);
  const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(false);
  
  useEffect(() => {
    storage.load(STORAGE_KEY).then((data) => {
      if (data !== null) {
        const { count, minCount, maxCount } = JSON.parse(data);
        setCount(count);
        setMinCount(minCount);
        setMaxCount(maxCount);
        setIsPersistenceEnabled(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isPersistenceEnabled) {
      storage.save(STORAGE_KEY, JSON.stringify({ count, minCount, maxCount }));
    }
  }, [count, minCount, maxCount]);

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
  const changeMaxCount = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(target.value, 10);
    setMaxCount(newMax);
  };
  const changeMinCount = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(target.value, 10);
    setMinCount(newMin);
    if (count < newMin) {
      setCount(newMin);
    }
  }
  const togglePersistence = () => {
    const newPersistenceEnabled = !isPersistenceEnabled;
    setIsPersistenceEnabled(newPersistenceEnabled);
    if(newPersistenceEnabled){
      storage.save(STORAGE_KEY, JSON.stringify({ count, minCount, maxCount}));
    }
    else{
      storage.remove(STORAGE_KEY);
    }
  };

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
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={isPersistenceEnabled}
            onChange={togglePersistence}
          />
          ローカルストレージに保存する
        </label>
      </div>
    </div>
  );
}

export default Counter;
