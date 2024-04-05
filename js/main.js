const upperDisplay = document.querySelector(".upper");
const lowerDisplay = document.querySelector(".lower");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentButton = document.getElementById("percent");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const addButton = document.getElementById("addition");
const subtractButton = document.getElementById("subtraction");
const equalsButton = document.getElementById("equals");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const dotButton = document.getElementById("dot");

let upperValue = '';
let lowerValue = '';

function displayValue () {
    upperDisplay.textContent = upperValue;
    lowerDisplay.textContent = lowerValue;
}

numberButtons.forEach( button => {
    button.addEventListener("click", function () {
        upperValue += button.textContent;
        displayValue();
    })
}
)
operatorButtons.forEach(button => {
button.addEventListener("click", function() {
    const lastChar = upperValue.charAt(upperValue.length - 1);
    const operator = button.textContent;

    if (!operator.includes(lastChar)) {
        upperValue += operator;
        displayValue();
    } else {

        console.log("Cannot add two operators in a row.");
    }
});
});

clearButton.addEventListener("click", function() {
    upperValue = '';
    lowerValue = '';
    displayValue();
})

deleteButton.addEventListener("click", function() {
    upperValue = upperValue.slice(0, -1);
    displayValue();
})     

percentButton.addEventListener("click", function() {
const lowerNumber = parseFloat(lowerValue);

if (isNaN(lowerNumber)) {
    lowerValue = 'Error: Invalid input';
    displayValue();
    return;
}

const result = (parseFloat(upperValue) * lowerNumber) / 100;

lowerValue = result.toString();
displayValue();
});

function calculate(goal) {
const operators = ['*', '/', '+', '-'];

const tokens = goal.match(/\d+|\+|\-|\*|\//g);

let result = parseFloat(tokens[0]);

for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = parseFloat(tokens[i + 1]);

    switch (operator) {
        case '*':
            result *= operand;
            break;
        case '/':
            if (operand !== 0) {
                result /= operand;
            } else {
                return 'Error: Division by zero';
            }
            break;
        case '+':
            result += operand;
            break;
        case '-':
            result -= operand;
            break;
        default:
            return 'Error: Invalid operator';
    }
}

return result;
}
equalsButton.addEventListener("click", function() {
    lowerValue = calculate(upperValue);
    displayValue();
});