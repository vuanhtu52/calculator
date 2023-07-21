let num1 = null;
let num2 = null;
let operator = null;
let clickedButton = null; // Keep track of which button is clicked
let previousButton = null;
let operation = ""; // Save the current operation to display
let result = 0; // Save the current result to display
const operators = ["+", "-", "x", "÷"]

const operationDisplay = document.querySelector(".operation");
const resultDisplay = document.querySelector(".result");

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
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
        if (operation.includes(symbol) && previousButton !== null && !isNaN(previousButton.id)) {
            return true;
        }
    }
    return false;
}

function updateDisplay() {
    // When user clicks a number
    if (!isNaN(clickedButton.id)) {
        if (previousButton !== null && previousButton.id === "=") {
            num1 = null;
            num2 = null;
            operator = null;
            operation = "";
        } 
        operation += clickedButton.id;
        operationDisplay.textContent = operation;
    }

    // When user clicks an operator
    if (operators.includes(clickedButton.id)) {
        // If there is already an operator, do the calculation first before continuing with this next operator
        if (nextOperation()) {
            num2 = parseInt(operation.split(operator)[1]);
            result = operate(num1, num2, operator);
            resultDisplay.textContent = result.toString();
            operation = result.toString();
        }

        // At the beginning, if user clicks an operator button, add 0 to the first number
        if (previousButton === null) {
            num1 = 0;
            operator = clickedButton.id;
            operation = num1.toString() + operator;
            operationDisplay.textContent = operation;
        }
        // If the previous button is a number, store the current number and update display
        if (previousButton !== null && !isNaN(previousButton.id)) {
            num1 = parseInt(operation);
            operator = clickedButton.id;
            operation += clickedButton.id;
            operationDisplay.textContent = operation;
        }
        // If the previous button is "=", add result to num1 and update display
        if (previousButton !== null && previousButton.id === "=") {
            num1 = result;
            operator = clickedButton.id;
            operation = num1.toString() + operator;
            operationDisplay.textContent = operation;
        }
    } 

    // When user clicks "="
    if (clickedButton.id === "=") {
        // If the previous button is a number, do the calculation and update display
        if (previousButton !== null && !isNaN(previousButton.id)) {
            // If user only enters a number and clicks "="
            if (num1 === null) {
                result = parseInt(operation);
                operation += "=";
                operationDisplay.textContent = operation;
                resultDisplay.textContent = result.toString();
            } else {
                num2 = parseInt(operation.split(operator)[1]);
                result = operate(num1, num2, operator);
                operation += "=";
                operationDisplay.textContent = operation;
                resultDisplay.textContent = result.toString();
            }
        } 
        // If the previous button is an operator and there's only one number, returns result (e.g. 1+) 
        if (previousButton !== null && operators.includes(previousButton.id)) {
            result = num1;
            operation = operation.substring(0, operation.length - 1) + "=";
            operationDisplay.textContent = operation;
            resultDisplay.textContent = result.toString();
        } 
    }
}

// Change border color when user clicks on a button
// Detect when user clicks the button
const buttons = document.querySelectorAll(".button-wrapper");
buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        previousButton = clickedButton;
        clickedButton = button;
        clickedButton.classList.add("button-clicked");
    });
});

// Detect when user releases the mouse after clicking a button
document.body.addEventListener("mouseup", () => {
    if (clickedButton !== null) {
        // Reset border color once user releases the mouse
        clickedButton.classList.remove("button-clicked");
        // Update display 
        updateDisplay();
    }
});

