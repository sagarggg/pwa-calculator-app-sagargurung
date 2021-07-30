if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

class Calculator {
    //defining constructor and parameters for class
    constructor(prevOperText, currentOperText) {
      this.prevOperText = prevOperText
      this.currentOperText = currentOperText
      this.clear()
    }
  
    //clear all the operators used when called
    clear() {
      this.currentOper = ''
      this.prevOpera = ''
      this.operation = undefined
    }
  
    //delete the operator using slice method
    delete() {
      this.currentOper = this.currentOper.toString().slice(0, -1)
    }
  
    //takes a parameter number
    appendNumber(number) {
        //check if the number is a decimal and the currentOperand has a decimal
      if (number === '.' && this.currentOper.includes('.')) return
      this.currentOper = this.currentOper.toString() + number.toString()
    }
    
    selectOperation(operation) {
      //check if there is any value/button user has selected before, if so then call the compute function
      if (this.currentOper === '') return
      if (this.prevOpera !== '') {
        this.compute()
      }
      this.operation = operation
      this.prevOpera = this.currentOper
      this.currentOper = ''
    }

    //method to do the mathematical calculations
    computeResult() {
      let compute;
      //parse a string and return a floating point number
      const prev = parseFloat(this.prevOpera)
      const current = parseFloat(this.currentOper)
      //check if the values are number and do computation
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          compute = prev + current
          break
        case '-':
          compute = prev - current
          break
        case '*':
          compute = prev * current
          break
        case '÷':
          compute = prev / current
          break
        default:
          return
      }
      this.currentOper = compute
      this.operation = undefined
      this.prevOpera = ''
    }
    
    //
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      //split the string value
      const intDigit = parseFloat(stringNumber.split('.')[0])
      const decDigit = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(intDigit)) {
        integerDisplay = ''
      } else {
          //format the number in proper english format
        integerDisplay = intDigit.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decDigit != null) {
        return `${integerDisplay}.${decDigit}`
      } else {
        return integerDisplay
      }
    }
  
    //method to update/display the user values
    updateDisplay() {
      this.currentOperText.innerText =
        this.getDisplayNumber(this.currentOper)
      if (this.operation != null) {
        this.prevOperText.innerText =
          `${this.getDisplayNumber(this.prevOpera)} ${this.operation}`
      } else {
        this.prevOperText.innerText = ''
      }
    }
  }
  
  //select all the appropriate buttons
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const prevOperText = document.querySelector('[data-previous-operand]')
  const currentOperText = document.querySelector('[data-current-operand]')

  //create object of the class Calculator
  const calculator = new Calculator(prevOperText, currentOperText)
  
  //create event listener for all numerical buttons being pressed
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      //pass the button value as a paramter to the appendNumber() method
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.selectOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  //call the computeResult method to perform the calculation and 
  //run the updateDisplay() method to set the value on the display and show result
  equalsButton.addEventListener('click', button => {
    calculator.computeResult()
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