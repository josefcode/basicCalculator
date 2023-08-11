let currentInput = '';
let currentOperation = '';
let resultElement = document.getElementById('result');
let digitAdd = document.getElementById('digit')

const appendNumber = (number) => {
    currentInput =+ number;
    resultElement.value = currentInput;
}