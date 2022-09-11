import React, { useState } from "react";
import Expression from "./Components/Expression";
import { updateData } from "./Utils";
import "./App.css";

function App() {
  const [expression, setExpression] = useState({
    type: "DEFAULT_TRUE",
    expression: "None",
  });

  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    type: "DEFAULT_TRUE",
    expression: "None",
  });

  const onChange = (updatedExpression) => {
    let expressionData = { ...expression };
    expressionData = updatedExpression;
    setExpression(expressionData);
    setShowResult(false);
  };

  const renderResult = () => {
    let data = updateData(expression);
    setResult(data);
    setShowResult(true);
  };

  return (
    <div className="App">
      <div className="main-box">
        <Expression expressionDataValue={expression} onParentchange={onChange} />
      </div>
      <button onClick={renderResult}>Show result</button>
      {showResult && <div>{JSON.stringify(result)}</div>}
    </div>
  );
}

export default App;
