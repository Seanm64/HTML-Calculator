class Calculator{
    constructor(previousOutputText,currentOutputText)
    {
        this.previousOutputText=previousOutputText
        this.currentOutputText=currentOutputText
        this.clear()
    }

    clear()
    {
        this.currentOutput = ''
        this.previousOutput = ''
        this.operation = undefined
    }

    delete()
    {
        this.currentOutput = this.currentOutput.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        //Make sure user can't use the '.' more than once
        if(number == '.' && this.currentOutput.includes('.')) return 
        this.currentOutput = this.currentOutput.toString() + number.toString()

    }

    chooseOperation(operation)
    {
        //Make sure user has numbers to operate on
        if(this.currentOutput == '' ) return
        //If something is in the previous operand and you are operating,
         // Do the computation and append that to previousOutput
        if(this.previousOutput !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOutput = this.currentOutput
        this.currentOutput = ''
    }

    compute()
    {
        let computation
        const prev = parseFloat(this.previousOutput)
        const current = parseFloat(this.currentOutput)

        //If user doesn't put anything, don't run
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation)
        {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOutput = computation
        this.operation = undefined
        this.previousOutput = ''
    }

    //Helper method to display the commas
    getDisplayNumber(number)
    {
        const stringNumber = number.toString()
        //Turns stringNumber into an array of 2, before and after the decimal
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const DecimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(DecimalDigits != null ) {
            return `${integerDisplay}.${DecimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay()
    {
        this.currentOutputText.innerText =
             this.getDisplayNumber(this.currentOutput)
        //If has an operation, display the operand element "+"
        if(this.operation != null) {
            this.previousOutputText.innerText = 
            `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
            //I'm not sure what the `'s are for
        }
        else{
            this.previousOutputText.innerText = ''
        }
    }
}





const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOutputText = document.querySelector('[data-previous-output]')
const currentOutputText = document.querySelector('[data-current-output]')

const calculator = new Calculator(previousOutputText, currentOutputText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})