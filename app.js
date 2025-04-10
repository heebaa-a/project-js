const displayExpression = document.getElementById("expression");
const displayResult = document.getElementById("result");
const historyContainer = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {


    const value = button.dataset.value || button.textContent.trim();


    if (button.dataset.action === "clear") {
      expression = "";
      displayExpression.textContent = "";
      displayResult.textContent = "0";
      return;
    }

    if (button.dataset.action === "clear-entry") {
      expression = expression.slice(0, -1);
      displayExpression.textContent = expression;
      return;
    }

    if (value === "=") {
      try {
        let evalExpr = expression
          .replace(/cos\(/g, "Math.cos(")
          .replace(/sin\(/g, "Math.sin(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/sqrt\(/g, "Math.sqrt(")
          .replace(/%/g, "/100");
        let result = eval(evalExpr);
        displayResult.textContent = result;

        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.textContent = `${expression} = ${result}`;
        historyContainer.prepend(historyItem);

      } catch {
        displayResult.textContent = "Error";
      }
      return;
    }

    expression += value;
    displayExpression.textContent = expression;
  });
});