//DOM elements
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number0');
const number1El = document.querySelector('.number1');
const number2El = document.querySelector('.number2');
const number3El = document.querySelector('.number3');
const number4El = document.querySelector('.number4');
const number5El = document.querySelector('.number5');
const number6El = document.querySelector('.number6');
const number7El = document.querySelector('.number7');
const number8El = document.querySelector('.number8');
const number9El = document.querySelector('.number9');

const numberArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El];

//variables
let valueStrInMemory = null;
let operatorInMemory = null;

//Functions
const getValueAsString = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsString());
}

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
  valueEl.textContent = parseFloat(valueStr).toLocaleString();
}

const handleNumberClick = (numString) => {
  const currentValueString = getValueAsString();
  if (currentValueString.length + 1 === 5) {
    valueEl.classList.add("active_5");
  }else if(currentValueString.length + 1 === 6){
    valueEl.classList.remove("active_5");
    valueEl.classList.add("active_6");
  }else if(currentValueString.length + 1 === 7){
    valueEl.classList.remove("active_5");
    valueEl.classList.remove("active_6");
    valueEl.classList.add("active_7");
  }else if(currentValueString.length + 1 === 8){
    valueEl.classList.remove("active_5");
    valueEl.classList.remove("active_6");
    valueEl.classList.remove("active_7");
    valueEl.classList.add("active_8");
  }else if(currentValueString.length + 1 === 9){
    valueEl.classList.remove("active_5");
    valueEl.classList.remove("active_6");
    valueEl.classList.remove("active_8");
    valueEl.classList.add("active_9");
  }

  if (currentValueString.length + 1 > 9) {
    return;
  }

  if (currentValueString === '0') {
    setStrAsValue(numString);
  } else {
    setStrAsValue(currentValueString + numString);
  }

};

const getResultOfOperationStr = ()=>{
  const currentValueNum = getValueAsNum();
  let valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
}

const handleOperatorClick = (operation) => {
  const currentValueString = getValueAsString();
  if (!valueStrInMemory) {
    valueStrInMemory = currentValueString;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }

  valueStrInMemory = getResultOfOperationStr();;
  operatorInMemory = operation;
  setStrAsValue('0');
}

//add event listeners to functions
acEl.addEventListener('click', () => {
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
})

pmEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueString = getValueAsString();
  if (currentValueString === "-0") {
    setStrAsValue('0');
    return;
  }

  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueString);
  } else {
    setStrAsValue(currentValueString.substring(1));
  }
})

percentEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
})

//add Event Listeners to operators
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
     setStrAsValue(getResultOfOperationStr());
     valueStrInMemory = null;
     operatorInMemory = null;
  }
})

//Add event listeners to numbers and decimal
for (let i = 0; i < numberArray.length; i++) {
  const numberEl = numberArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  })
}

decimalEl.addEventListener(('click'), () => {
  const currentValueString = getValueAsString();
  if (!currentValueString.includes('.')) {
    setStrAsValue(currentValueString + '.');
  }
})
