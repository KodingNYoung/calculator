// WHEN YOU COME BACK START WITH THE FUNCTIONALITY OF THE CALCULATOR TO PICK UP ANSWER WHEN AN OPERATOR IS CLICKED ON AFTER AN ANSWER IS GOTTEN.


// variables
let display = [], current = "", value= [], ans;

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
const equals = document.querySelectorAll(".equal");

// get the output field
const outputDisplay = document.getElementById("output-field");

// BACKSPACE
// get the backspace
const backspace = document.getElementById("backspace");

// ADVANCE FUNCTIONS
const advanceFunctionsBtn = document.querySelectorAll("button[data-advance]");

// ANSWER BTN
// get the answer btn
const answerBtn = document.querySelector(".answer");

// functions
// handle numbers
const handleNumbers = (e) => {
    // get the clicked btn
    const target = e.target;

    // check if the input is a dot and handle
    if (e.target.dataset.display === "." && !isDotValid()) return;

    // update the current and input value
    current += target.dataset.display;
    
    display.push(target.dataset.display);

    value.push(target.value);

    // update display
    updateInputDisplay();

    // console.log(current);
    // console.log(display);
}

// check if the dot addition is valid
const isDotValid = () => {
    // returns false if there's a dot aiidy
    if (current.includes(".")) return false;

    // else return true
    return true;
}

// update input display
const updateInputDisplay = () => {
    // merge the list items
    const liMerged = display.join("");

    inputDisplay.value = liMerged;
}

// update output display
const updateOutputDisplay = () => {
    // merge the value list
    let valueListMerged = value.join("");

    // if the string is empty just give an empty output
    if (valueListMerged === "") {
        // show it on the output
        outputDisplay.value = "";
        return
    } 

    // get the merged value and find the eval value
    ans = eval(valueListMerged);

    // get the number of d.p for the answer
    const DP = getDecimalPlace(ans);

    // update the answer btn
    updateAns(ans, DP);

    // show it on the output
    outputDisplay.value = eval(ans.toFixed(DP));
}

const updateAns = (ans, decimalPlaces) => {
    answerBtn.value = ans;

    answerBtn.dataset.display = eval(ans.toFixed(decimalPlaces));
}

// handle operators
const handleOperators = (e) => {
    // get the clicked btn
    const target = e.target.closest("button");

    if(isNaN(current)) return;

    // empty the current string
    current ="";

    // check if there was an answer there before
    if (isAnswerPresent(target)) return;

    // check if sign is valid
    if (!isSignValid(target)) return;

    // if the sign is valid
    // update the display and value variable
    display.push(target.dataset.display);

    value.push(target.value);

    // update display
    updateInputDisplay();
}

// check there was answer before this
const isAnswerPresent = (target) => {
    // if there is an answer and input is clear
    if (ans && !inputDisplay.value) {
        // make the answer to display with the operator 
        display = [ans.toString(), target.dataset.display]; 

        value = [ans.toString(), target.value];

        // update the display
        updateInputDisplay();

        // clear display output
        outputDisplay.value = "";
        
        return true;
    }

    return false;
}
const isSignValid = (target) => {
    const sign = target.value;
    // get the last input of the display
    
    const prevEntry = value[value.length -1];
    
    // return false
    // if the input is clear or the last input was a sign and the new sign is not "-"
    if (((value.length === 0) || (["+", "*", "/"].includes(prevEntry))) && !(sign === "-")) {
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
    // if there is no value, don't go further
    if (!value[0]) return;

    // check the input and process it for output
    updateOutputDisplay();

    // clear the input display screen, current variable and display variable
    current = "";
    display = [];
    value = [];

    // update display
    updateInputDisplay();
}

// check the dp of a number
const getDecimalPlace = (num) => {
    let DP =0;

    // if num is a decimal
    if ((isFinite(num)) && !(num % 1 === 0)){
        // get the decimal part
        console.log(num)
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

    // if it's a number, delete for current, value and display
    if (!isNaN(prevEntry) || prevEntry === ".") {
        current = current.slice(0, -1);
    }
    
    backspaceDisplays();

    // update the input
    updateInputDisplay();
}

// backspace displays
const backspaceDisplays = () => {
    value = value.slice(0, -1);
    display = display.slice(0, -1);
}

// handle advanced functions
const handleAdvancedFunctions = (e) => {
    // get the target btn
    const target = e.target;

    // check if the button is for level 1
    if (target.dataset.level === "1"){
        handleLevelOne(target);
    }
    // if it's for level zero
    else if (target.dataset.display === "^" || target.dataset.display === "%"){
        handleLevelZero(target);
    }
    else{
        display.push(e.target.dataset.display);

        value.push(e.target.value);
    }

    updateInputDisplay();
}

// handle square
const handleLevelZero = (target) => {
    // get the last entry
    const lastEntry = value[value.length-1];

    // if the last entry is a number
    if (!isNaN(lastEntry)){
        // display the power
        display.push(target.dataset.display);

        value.push(target.value)
    }
}

// handle square root
const handleLevelOne = (target) => {
    // get the last entry
    const lastEntry = value[value.length-1];

    // if the last entry is a number
    if (!isNaN(lastEntry)){
        // put a time before it
        display.push(`${target.dataset.display}`);

        value.push(`*${target.value}`)
         
        console.log("added times")
    }else {
        // put a time before it
        display.push(target.dataset.display);

        value.push(target.value);
    }

}

// for long press cancel
(function () {
  
    // get the left right top and bottom coordinate of the button.
    let top = backspace.getBoundingClientRect().top,
        bottom = backspace.getBoundingClientRect().bottom,
        right = backspace.getBoundingClientRect().right,
        left = backspace.getBoundingClientRect().left;

    // Create variable for setTimeout
    let delay;

    // clear inputs
    const clearInput = () => {
        // let _this = this;

        // console.log(_this)
        // clear display space
        const clearDisplay = () => {
            // clear an variables
            display = [];
            value = [];
            current = "";

            // update the input and output
            updateInputDisplay();
            updateOutputDisplay();
        }
        
        // set a delay to ensure it's a long press
        delay = setTimeout(clearDisplay, 1000);   

        // console.log(delay)
    }

    backspace.addEventListener('mousedown', () => {
        clearInput();
    }, true);


    backspace.addEventListener('touchstart', (e) => {
        clearInput();
        
    }, true);

    backspace.addEventListener('mouseup', () => {
        // On mouse up, we know it is no longer a longpress
        clearTimeout(delay);
    });

    backspace.addEventListener('touchend', () => {
        // when the touch is event end
        // get the co
        clearTimeout(delay);

        
    });

    backspace.addEventListener('mouseleave', () => {
        // when the mouse moves out, cancel the long press
        clearTimeout(delay);
    });

    backspace.addEventListener('touchmove', (e) => {


        // console.log(e.changedTouches[0].pageX);
        if (e.changedTouches[0].pageX> right || e.changedTouches[0].pageX < left || e.changedTouches[0].pageY >bottom || e.changedTouches[0].pageY<top){
            clearTimeout(delay);
        }
    });
}());

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
equals.forEach((equal) => {
    equal.addEventListener("click", handleEqual);
})
// backspace
backspace.addEventListener("click", handleBackspace);

// advance functions
advanceFunctionsBtn.forEach(advancedBtn =>{
    advancedBtn.addEventListener("click", handleAdvancedFunctions)
})