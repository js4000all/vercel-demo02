import React from "react";

interface Option {
  value: string | number; // 数値・文字列どちらも許可
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: Option[];
  selectedValue: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, selectedValue, onChange }) => {
  return (
    <div style={{ marginTop: "15px" }}>
      <label>{label}</label>
      <span>
        {options.map((option) => (
          <label key={option.value} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </span>
    </div>
  );
}

export default RadioGroup;
