const numbersBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-key= "Backspace"]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '0';
        this.prevOperand = '0';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString() === '0' ? '0' : this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() +  number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.prevOperand !== '') {
            this.operate();
        }
        this.operation  = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = Math.round(computation);
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null ) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
   
    updateDisplay() {
        //round value with long decimals so that they don’t overflow the screen.
        this.currentOperandTextElement.innerText = this.currentOperand.length > 9 ? this.getDisplayNumber(this.currentOperand).substring(0, 9) : this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandTextElement.innerText = '0';
        }    
    }
}

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);
//update displayed value
numbersBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
//choose the calc operation
operationsBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
//show the calculation result
equalsBtn.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
});
//reset calculation
allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
//delete number
deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

//keyboard support
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.key}']`);
    //handel null or undefined error and call the click function
    key?.click();
});

