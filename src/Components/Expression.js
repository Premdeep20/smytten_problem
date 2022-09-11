import React, { useEffect, useState, memo } from "react";
import Dropdown from "./Dropdown";
import questions from "../Constants/Data";
import {
  options,
  comparision_single_options,
  comparision_multi_options,
} from "../Constants/index";

const Expression = ({ expressionDataValue, onParentchange }) => {
  const [expression, setExpression] = useState(expressionDataValue);

  useEffect(() => {
    onParentchange(expression);
  }, [expression]);

  const onChange = (updatedExpression, index) => {
    let expressionData = { ...expression };
    if (index !== undefined) {
      expressionData.expression[index] = updatedExpression;
    } else {
      expressionData.expression = updatedExpression;
    }
    setExpression(expressionData);
  };

  const changeOption = (value, type, idx) => {
    let expressionData = { ...expression };
    if (type === "expression") {
      expressionData.type = value;
      if (value !== "None" && value === "SIMPLE_CONDITION") {
        expressionData.expression = {
          question: "",
          question_text: "",
          comparison: "",
          value: "",
          options: [],
          question_type: "",
        };
      } else if (
        value !== "None" &&
        (value === "OR_CONDITON" || value === "AND_CONDITON")
      ) {
        expressionData.expression = [
          {
            type: "DEFAULT_TRUE",
            expression: "None",
          },
          {
            type: "DEFAULT_TRUE",
            expression: "None",
          },
        ];
      }
    } else if (type === "question_text") {
      let index = questions.findIndex(
        (question) => question.question_text === value
      );
      if (idx !== undefined) {
        expressionData.expression[idx] = {
          question: questions[index].id,
          question_text: value,
          comparison: "",
          value: "",
          options: questions[index].options,
          question_type: questions[index].question_type,
        };
      } else {
        expressionData.expression = {
          question: questions[index].id,
          question_text: value,
          comparison: "",
          value: "",
          options: questions[index].options,
          question_type: questions[index].question_type,
        };
      }
    } else if (type === "comparison") {
      if (idx !== undefined) {
        expressionData.expression[idx] = {
          ...expressionData.expression[idx],
          comparison: value,
        };
      } else {
        expressionData.expression = {
          ...expressionData.expression,
          comparison: value,
        };
      }
    } else if (type === "value") {
      if (idx !== undefined) {
        expressionData.expression[idx] = {
          ...expressionData.expression[idx],
          value: value,
        };
      } else {
        expressionData.expression = {
          ...expressionData.expression,
          value: value,
        };
      }
    }
    setExpression(expressionData);
  };
  return (
    <>
      <Dropdown
        options={options}
        selectedOption={expressionDataValue.type}
        changeOption={changeOption}
        type="expression"
      />
      {
        expressionDataValue.type !== "DEFAULT_TRUE" && expressionDataValue.type === "SIMPLE_CONDITION" && (
          <>
            <Dropdown
              options={questions}
              selectedOption={expressionDataValue.expression.question_text}
              changeOption={changeOption}
              type="question_text"
            />
            <Dropdown
              options={
                expressionDataValue.expression.question_type === "SINGLE_SELECT"
                  ? comparision_single_options
                  : comparision_multi_options
              }
              selectedOption={expressionDataValue.expression.comparison}
              changeOption={changeOption}
              type="comparison"
            />
            <Dropdown
              options={expressionDataValue.expression.options}
              selectedOption={expressionDataValue.expression.value}
              changeOption={changeOption}
              type="value"
            />
          </>
        )
      }
      {expressionDataValue.type !== "DEFAULT_TRUE" &&
        expressionDataValue.type !== "SIMPLE_CONDITION" &&
        expressionDataValue.expression.map((eee,index) => {
          return (
            <div className="main-box">
              <Expression expressionDataValue={eee} onParentchange={(val) => onChange(val, index)} />
            </div>
          );
        })}
    </>
  );
};

export default memo(Expression);
