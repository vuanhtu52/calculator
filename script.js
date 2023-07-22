let num1 = null;
let num2 = null;
let operator = null;
let click = false;
let clickedButton = null; // Keep track of which button is clicked
let operation = ""; // Save the current operation to display
let result = 0; // Save the current result to display
const operators = ["+", "-", "x", "÷"]

const operationDisplay = document.querySelector(".operation");
const resultDisplay = document.querySelector(".result");

function add(num1, num2) {
    result = num1 + num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function subtract(num1, num2) {
    result = num1 - num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function multiply(num1, num2) {
    result = num1 * num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function divide(num1, num2) {
    result = num1 / num2;
    result = Math.round(result * 1000) / 1000;
    return result;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x": 
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function nextOperation() {
    for (let symbol of operators) {
        if (operation.includes(symbol) && !isNaN(operation.slice(-1))) {
            return true;
        }
    }
    return false;
}

function canAddDecimal() {
    let tempOperator = null;
    let tempNum1 = null;
    let tempNum2 = null;
    // If the previous button clicked is not a digit, user cannot add the decimal
    if (isNaN(operation.slice(-1))) {
        return false;
    }
    // Detect if the current operation has an operator
    for (let symbol of operators) {
        if (operation.includes(symbol)) {
            tempOperator = symbol;
        }
    }
    // When user is entering num1
    if (tempOperator === null) {
        tempNum1 = operation;
        if (!tempNum1.includes(".")) {
            return true;
        }
    } else { // When user is entering num2
        tempNum2 = operation.split(tempOperator)[1];
        if (!tempNum2.includes(".")) {
            return true;
        }
    }

    return false;
}

function reset() {
    num1 = null;
    num2 = null;
    operator = null;
    operation = "";
    result = 0;
    operationDisplay.textContent = operation;
    resultDisplay.textContent = result.toString();
}

function backspace() {
    if (operation !== "") {
        if (operation.startsWith("-") && operation.length == 2) {
            operation = "";
        } else {
            operation = operation.substring(0, operation.length - 1);
        }
    }
    operationDisplay.textContent = operation;
}

function hasOperator() {
    for (let symbol of operators) {
        if (operation.substring(1, operation.length).includes(symbol)) {
            return true;
        }
    }
    return false;
}

function updateDisplay() {
    // When user clicks a number
    if (!isNaN(clickedButton.id)) {
        if (operation.endsWith("=")) {
            num1 = null;
            num2 = null;
            operator = null;
            operation = "";
        } 
        operation += clickedButton.id;
        operationDisplay.textContent = operation;
    }

    // when user clicks "."
    if (clickedButton.id === ".") {
        if (canAddDecimal()) {
            operation += clickedButton.id;
            operationDisplay.textContent = operation;
        }
    }

    // When user clicks an operator
    if (operators.includes(clickedButton.id)) {
        // If there is already an operator, do the calculation first before continuing with this next operator
        if (nextOperation()) {
            num2 = parseFloat(operation.split(operator)[1]);
            result = operate(num1, num2, operator);
            resultDisplay.textContent = result.toString();
            operation = result.toString();
        }

        // At the beginning, if user clicks an operator button, add 0 to the first number
        if (operation === "") {
            num1 = 0;
            operator = clickedButton.id;
            operation = num1.toString() + operator;
            operationDisplay.textContent = operation;
        }
        // If the last character is a number, store the current number and update display
        if (!isNaN(operation.slice(-1))) {
            num1 = parseFloat(operation);
            operator = clickedButton.id;
            operation += clickedButton.id;
            operationDisplay.textContent = operation;
        }
        // If the last character is "=", add result to num1 and update display
        if (operation.endsWith("=")) {
            num1 = result;
            operator = clickedButton.id;
            operation = num1.toString() + operator;
            operationDisplay.textContent = operation;
        }
    } 

    // When user clicks "="
    if (clickedButton.id === "=") {
        // If the last character is a number, do the calculation and update display
        if (!isNaN(operation.slice(-1))) {
            // If user only enters a number and clicks "="
            if (!hasOperator()) {
                result = parseFloat(operation);
                operation += "=";
                operationDisplay.textContent = operation;
                resultDisplay.textContent = result.toString();
            } else {
                num2 = parseFloat(operation.split(operator)[1]);
                result = operate(num1, num2, operator);
                operation += "=";
                operationDisplay.textContent = operation;
                resultDisplay.textContent = result.toString();
            }
        } 
        // If the last character is an operator and there's only one number, returns result (e.g. 1+) 
        if (operators.includes(operation.slice(-1))) {
            result = num1;
            operation = operation.substring(0, operation.length - 1) + "=";
            operationDisplay.textContent = operation;
            resultDisplay.textContent = result.toString();
        } 
    }

    // When user clicks "CLEAR"
    if (clickedButton.id === "clear") {
        reset();
    }

    // When user clicks "DELETE"
    if (clickedButton.id === "delete") {
        backspace();
    }
}

// Change border color when user clicks on a button
// Detect when user clicks the button
const buttons = document.querySelectorAll(".button-wrapper");
buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        click = true;
        clickedButton = button;
        clickedButton.classList.add("button-clicked");
    });
});

// Detect when user releases the mouse after clicking a button
document.body.addEventListener("mouseup", () => {
    if (click) {
        // Reset border color once user releases the mouse
        clickedButton.classList.remove("button-clicked");
        // Update display 
        updateDisplay();
    }
    click = false;
});

