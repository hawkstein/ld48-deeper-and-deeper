/* eslint-disable no-unused-vars */
import React from "react";
import "./CycleSelect.css";

function CycleSelect() {
  const [options, setOptions] = React.useState(["Easy", "Standard", "Hard"]);
  const [current, setCurrent] = React.useState(0);
  return (
    <button
      className="CycleSelect-button"
      onClick={() => {
        setCurrent(current < options.length - 1 ? current + 1 : 0);
      }}
    >
      {options[current]}
    </button>
  );
}

export default CycleSelect;
