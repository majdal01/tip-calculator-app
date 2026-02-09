const billInput = document.getElementById("bill-amount");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people-number");

const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");

const resetButton = document.getElementById("reset-button");
const peopleError = document.getElementById("people-error");
const redLine = document.getElementById("redline");

let selectedTip = null;

billInput.addEventListener("input", () => {
  if(billInput.max && parseFloat(billInput.value) > parseFloat(billInput.max)) {
    billInput.value = billInput.max;
  }
});
peopleInput.addEventListener("input", () => {
  if(peopleInput.max && parseFloat(peopleInput.value) > parseFloat(peopleInput.max)) {
    peopleInput.value = peopleInput.max;
  }
});

// Tip button selection
tipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tipButtons.forEach(b => { 
      b.classList.remove("selected"); 
      b.classList.remove("ready"); 
    });
    btn.classList.add("selected");

    selectedTip = parseFloat(btn.textContent) / 100;
    customTipInput.value = "";

    calculate();
  });
});

// Custom tip input
customTipInput.addEventListener("input", () => {
  if (customTipInput.value === "") return;

  tipButtons.forEach(b => { 
    b.classList.remove("selected");
    b.classList.remove("ready");
  });
  selectedTip = parseFloat(customTipInput.value) / 100;

  calculate();
});

// Input listeners for bill and people
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

// Prevent invalid characters in inputs
billInput.addEventListener("keydown", function(e) {
if (["e", "E", "+", "-"].includes(e.key)) {
e.preventDefault();
}
});
peopleInput.addEventListener("keydown", function(e) {
if (["e", "E", "+", "-"].includes(e.key)) {
e.preventDefault();
}
});
customTipInput.addEventListener("keydown", function(e) {
if (["e", "E", "+", "-"].includes(e.key)) {
e.preventDefault();
}
});


// Calculation function
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  // Validate people input
  if (!people || people <= 0) {
    peopleError.classList.remove("hidden");
    redLine.classList.add("red-line");
  } else {
    peopleError.classList.add("hidden");
    redLine.classList.remove("red-line");
  }
  // Enable reset button if any input is present
  if (billInput.value || peopleInput.value || selectedTip) {
    resetButton.disabled = false;
    resetButton.classList.add("active");
    resetButton.classList.remove("ready");
  } 
  // Change reset button to ready state if all inputs are valid
  if (billInput.value && peopleInput.value && selectedTip) {
    resetButton.classList.remove("active");
    resetButton.classList.add("ready");
    // Change selected tip button to ready state
    const selectedBtn = document.querySelector('.tip-btn.selected');
    if (selectedBtn) {
      selectedBtn.classList.add('ready');
      selectedBtn.classList.remove('selected');
  }
  }
  // If any input is missing or invalid, reset displays
  if (!bill || !people || !selectedTip) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }
  // Perform calculations
  const tipPerPerson = (bill * selectedTip) / people;
  const totalPerPerson = bill / people + tipPerPerson;

  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

  resetButton.disabled = false;
}

// Reset button functionality
resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";

  tipButtons.forEach(b => {
    b.classList.remove("selected");
    b.classList.remove("ready");
    b.classList.remove("active");
  });
  selectedTip = null;

  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  peopleError.classList.add("hidden");
  redLine.classList.remove("red-line");
  resetButton.disabled = true;
});