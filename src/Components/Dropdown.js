import React from "react";

const Dropdown = ({ options, selectedOption, changeOption, type }) => {
  return (
    <div>
      <select
        value={selectedOption}
        onChange={(event) => changeOption(event.target.value, type)}
      >
        {["", "DEFAULT_TRUE"].includes(selectedOption) && (
          <option value="DEFAULT_TRUE" key={type + options.length}>
            None
          </option>
        )}
        {options.map((option, index) => {
          return (
            <option
              key={type + index}
              value={type !== "expression" ? option.question_text : option}
            >
              {type === "question_text" ? option.question_text : option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
