import React from "react";

function RadioGroup({ label, options, selectedValue, onChange }) {
  return (
    <div style={{ marginTop: "15px" }}>
      <label>{label}</label>
      <div>
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
      </div>
    </div>
  );
}

export default RadioGroup;
