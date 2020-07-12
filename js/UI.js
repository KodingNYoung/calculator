// COPY FEATURE
// get the copy button and the output
const copyBtn = document.getElementById("copy-btn");
const output = document.getElementById("output-field");

// EXTRA BUTTONS SLIDE UP FEATURE
// get the chevron container and overlay
const chervon = document.querySelector(".chevron");
const overlay = document.querySelector(".over-lay");
// get the main button container
const main = document.querySelector(".main");
// get the icon
const chevIcon =  document.querySelector(".fa-chevron-up");

// DARK MODE FEATTURE
// get the mode toggler
const modeBtn = document.getElementById("mode-toggle");
const calculator = document.getElementById("calculator");

// copy function
const copyAns = () => {
    if (output.value){
        // get the value to be copied
        const text = output.value;

        // copy the text
        copyText(text);

        // give a notification
        alert("You have copied the answer!");
    } 
}
// copy text
const copyText = (text) => {
    // create an input field
    const el = document.createElement('textarea');

    // set it's value to the text
    el.value = text;
    
    // append the field to document
    document.body.appendChild(el);

    // select and copy the value of the field
    el.select();
    el.setSelectionRange(0,9999);
    document.execCommand('copy');
    
    // remove the text field from document
    document.body.removeChild(el);
}
// chevron click handler
const handleChevronClick = (e) => {
    // console.log(mainBtns);
    if (chevIcon.className === "fas fa-chevron-up"){
        // console.log("go up");

        // go up
        overlay.style.transform ="translateY(-89%)";

        // change class of icon
        chevIcon.className = "fas fa-chevron-down";

        // disable pointer activity in the main
        Array.from(main.children).forEach(child => {
            child.classList.add("disabled")
        })
    }else if (chevIcon.className === "fas fa-chevron-down"){
        goDown();
    }
}

const goDown = () => {
    // go down
    overlay.style.transform ="translateY(0%)";

    // change class of icon
    chevIcon.className = "fas fa-chevron-up";

    // enable main buttons
    Array.from(main.children).forEach(child => {
        child.classList.remove("disabled")
    })
}


const toggleMode = (e) => {
    const target = e.target.closest("#mode-toggle");

    // change the switch
    target.classList.toggle("toggled");

    // change the mode
    calculator.classList.toggle("dark");
}

// add event listener to it..
// copy
copyBtn.addEventListener("click", copyAns)

// chevron
chervon.addEventListener("click", handleChevronClick);

// mode toggle
modeBtn.addEventListener("click", toggleMode);

// main
main.addEventListener("click", goDown)
