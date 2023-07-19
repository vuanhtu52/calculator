let num1;
let num2;
let operator;
let clickedButton = null;

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
        case "*": 
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

// Change border color when user clicks on a button
buttons = document.querySelectorAll(".button-wrapper");
buttons.forEach(button => {
    button.addEventListener("mousedown", event => {
        clickedButton = button;
        clickedButton.classList.add("button-clicked");
    });
});

document.body.addEventListener("mouseup", event => {
    if (clickedButton !== null) {
        clickedButton.classList.remove("button-clicked");
        clickedButton = null;
    }
});

