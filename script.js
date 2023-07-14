const keypad = document.querySelector(".keypad");
const screen = document.querySelector(".screen");
const valueButtons = document.querySelectorAll(".num");
const operationArray = [];
let isScreenCleared = true;
let screenString = "0";
let currentOperation = "";

function updateScreen() {
    screen.innerText = screenString;
}

function clearScreen() {
    isScreenCleared = true;
    screenString = "0";
    currentOperation = "";
    operationArray.length = 0;
    updateScreen();
}

function round(number, digits = 0) {
    return Number(`${Math.round(`${number}e${digits}`)}e-${digits}`);
}

const clearKey = document.querySelector("#clear");
clearKey.addEventListener("click", function() {
    clearScreen();
});

const opKeys = document.querySelectorAll(".op");
opKeys.forEach(button => {
    button.addEventListener("click", function() {
        operationArray.push({operator: currentOperation, value: parseFloat(screenString)});
        currentOperation = this.value;
        isScreenCleared = true;
    });
});

const calculateKey = document.querySelector("#calculate");
calculateKey.addEventListener("click", function() {
    calculate();
});

const decKey = document.querySelector("#dec");
decKey.addEventListener("click", function() {
    if(!screenString.includes(".")) {
        screenString += ".";
        isScreenCleared = false;
        updateScreen();
    }
});

const plusMinusKey = document.querySelector("#plus-minus");
plusMinusKey.addEventListener("click", function() {
    
    if(screenString === "0") {
        screenString = "-";
        isScreenCleared = false;
    } else if(screenString[0] !== "-") {
        screenString = "-" + screenString;
    } else {
        screenString = screenString.slice(1);
    }
    updateScreen();
});

const percentKey = document.querySelector("#percent");
percentKey.addEventListener("click", function() {
    screenString = round((parseFloat(screenString)/100), 6).toString();
    updateScreen();
});


valueButtons.forEach(button => { 
    button.addEventListener("click", function () {
    if(isScreenCleared === false) {
        screenString += this.value;
    } else {
        screenString = this.value;
        isScreenCleared = false;
    }
    updateScreen();
    });
});

function calculate() {
    
    operationArray.push({operator: currentOperation, value: parseInt(screenString)});

    screenString = round(operationArray.reduce((accumulator, operation) => {
        switch(operation.operator) {
        case "add":
            return accumulator + operation.value;
        case "subtract":
            return accumulator - operation.value;
        case "multiply":
            return accumulator * operation.value;
        case "divide":
            if(operation.value !=0) {
                return accumulator / operation.value;
            } 
            screenString = "ERROR";
            break;
        case "":
            return operation.value;
        default:
            return accumulator;
        }}, 0), 6).toString();

    operationArray.length = 0;
    currentOperation="";
    updateScreen();

}

clearScreen();
