let displayValue = '0';
let secondValue = '0'
let total = '0'

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b


const operate = (fun, num1, num2) => fun(num1, num2)


const updateDisplay = () => {
    const display = document.querySelector('.display');
    display.textContent = displayValue;
}

const clickNumber = (digit) => {
    displayValue = displayValue === '0' ? digit : displayValue + digit
    updateDisplay()
}

const clearDisplay = () => {
    displayValue = '0'
    updateDisplay()
}

const backspace = () => {
    displayValue = displayValue.slice(0, -1) === '' ? '0' : displayValue.slice(0, -1);
    updateDisplay();
}


const digitButtons = document.querySelectorAll('.digit')
digitButtons.forEach(button => {
    button.addEventListener('click', () => clickNumber(button.textContent))
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);

const arrowButton = document.querySelector('.backspace');
arrowButton.addEventListener('click', backspace);

const operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach(button => {
    const buttonText = button.textContent
    if(buttonText === '+'){
       const oldValue = parseFloat(displayValue)
       button.addEventListener('click', () => console.log(curentValue ,displayValue))
       updateDisplay()
       
    }
    if(buttonText === '/'){
       button.addEventListener('click', () => console.log(buttonText))
    }
    if(buttonText === '*'){
       button.addEventListener('click', () => console.log(buttonText))
    }
    if(buttonText === '-'){
       button.addEventListener('click', () => console.log(buttonText))
    }
    
})