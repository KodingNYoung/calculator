// WHEN YOU COME BACK START WITH THE FUNCTIONALITY OF THE CALCULATOR TO PICK UP ANSWER WHEN AN OPERATOR IS CLICKED ON AFTER AN ANSWER IS GOTTEN.


// variables
let display = "", current = "", value= "", ans; 

// any button that is pressed will be displayed

// NUMBERS
// get the numbers
const numberBtns = document.querySelectorAll("button[data-number]");

// get the input display
const inputDisplay = document.getElementById("input-field");

// OPERATORS
// get the operators
const operatorBtns = document.querySelectorAll("button[data-operator]");

// EQUAL
// get the equal operator
const equal = document.getElementById("equal");

// get the output field
const outputDisplay = document.getElementById("output-field");

// BACKSPACE
// get the backspace
const backspace = document.getElementById("backspace");

// functions
// handle numbers
const handleNumbers = (e) => {
    // get the clicked btn
    const target = e.target;

    // check if the input is a dot and handle
    if (e.target.dataset.display === "." && !validDot()) return;

    // update the current and input value
    current += target.dataset.display;
    
    display += target.dataset.display;

    value += target.value;

    // update display
    updateInputDisplay();

    // console.log(current);
}

// check if the dot addition is valid
const validDot = () => {
    // returns false if there's a dot aiidy
    if (current.includes(".")) return false;

    // else return true
    return true;
}

// handle operators
const handleOperators = (e) => {
    // get the clicked btn
    const target = e.target.closest("button");

    if(isNaN(current)) return;

    // empty the current string
    current ="";

    // if there was an answer there before
    if (checkAnswer(target)) return;

    // check if sign is valid
    if (!validSign(target)) return;

    // if the sign is valid
    // update the display and value variable
    display += target.dataset.display;

    value += target.value;

    // update display
    updateInputDisplay();
}

// check there was answer before this
const checkAnswer = (target) => {
    // if there is an answer and input is clear
    if (ans && !inputDisplay.value) {
        // make the answer to display with the operator 
        display = ans.toString() + target.dataset.display; 

        value = ans.toString() + target.value;

        // update the display
        updateInputDisplay();

        outputDisplay.value = "";
        
        return true;
    }

    return false;
}
const validSign = (target) => {
    const sign = target.value;
    // get the last input of the display
    
    const prevEntry = value[value.length -1];
    
    // return false
    // if the input is clear or the last input was a sign and the new sign is not "-"
    if (((value === "") || (["+", "*", "/"].includes(prevEntry))) && !(target.value === "-")) {
        console.log("invalid-sign")
        return false;
    }else if (prevEntry==="-"){
        return false
    }

    // // else
    // return true;
    return true
}



// equal
const handleEqual = () => {
    // if there is not value, don't go further
    if (!value) return;

    // the value variable and find the eval value
    ans = eval(value)

    // check for the number of d.p for the answer
    const dec = checkDecimalPlace(ans);

    // show it on the output
    outputDisplay.value = ans.toFixed(dec);

    // clear the display screen, current variable and display variable
    inputDisplay.value = "";
    current = "";
    display = "";
    value = "";
}

// check the dp of a number
const checkDecimalPlace = (num) => {
    let DP =0;

    // if num is a decimal
    if (!(num % 1 === 0)){
        const decimal = num.toString().split(".")[1];

        // get the num of decimal place
        DP = decimal.length;

        // if DP is more than 12
        if (DP > 12) {
            DP = 12;
        }
    }

    return DP;
}
// handle backspace
const handleBackspace = () => {
    // get the prev entry
    const prevEntry = value[value.length -1];

    // if its a reg number, delete for current, value and display
    if (!isNaN(prevEntry) || prevEntry === ".") {
        current = current.slice(0, -1);
        value = value.slice(0, -1);
        display = display.slice(0, -1);
    }
    // if its a sign, delete for value and display
    if (["+", "*", "/", "-"].includes(prevEntry)) {
        value = value.slice(0, -1);
        display = display.slice(0, -1);
    }
    // if it is some other things, do some other things


    updateInputDisplay();
}

// update display
const updateInputDisplay = () => {
    inputDisplay.value = display;
}
// add event listener to it...
// numbers
numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", handleNumbers);
})

// operators
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", handleOperators);
})

// equal
equal.addEventListener("click", handleEqual);

// backspace
backspace.addEventListener("click", handleBackspace);