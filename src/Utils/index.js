export const updateData = (expressionData) => {
  let data = JSON.parse(JSON.stringify(expressionData));
  if (data.type === "DEFAULT_TRUE") {
    return data;
  }
  if (!Array.isArray(data.expression)) {
    let { comparison } = data.expression;
    if (comparison === "EQUAL" || comparison === "IS_EXACTLY") {
      data.expression.comparison = "IS";
    } else if (comparison === "NOT_EQUAL") {
      data.expression.comparison = "IS NOT";
    } else if (comparison === "CONTAINS") {
      data.expression.comparison = "ARE";
    } else if (comparison === "DOES_NOT_CONTAIN") {
      data.expression.comparison = "ARE NOT";
    }
    delete data.expression.options;
    delete data.expression.question_type;
  } else if (Array.isArray(data.expression)) {
    data.expression = data.expression.map((d) => {
      return updateData(d);
    });
  }
  return data;
};
