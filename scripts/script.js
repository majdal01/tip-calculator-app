const billInput = document.getElementById("bill-amount");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people-number");

const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");

const resetButton = document.getElementById("reset-button");
const peopleError = document.getElementById("people-error");

let selectedTip = null;

// Tip button selection
tipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tipButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedTip = parseFloat(btn.textContent) / 100;
    customTipInput.value = "";

    calculate();
  });
});

// Custom tip input
customTipInput.addEventListener("input", () => {
  if (customTipInput.value === "") return;

  tipButtons.forEach(b => b.classList.remove("selected"));
  selectedTip = parseFloat(customTipInput.value) / 100;

  calculate();
});

//Input listeners for bill and people
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

// ------------------ CALCULATION ------------------
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!people || people <= 0) {
    peopleError.classList.remove("hidden");
    resetButton.disabled = true;
    return;
  } else {
    peopleError.classList.add("hidden");
  }

  if (!bill || !selectedTip) {
    resetButton.disabled = true;
    return;
  }

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

  tipButtons.forEach(b => b.classList.remove("selected"));
  selectedTip = null;

  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  peopleError.classList.add("hidden");
  resetButton.disabled = true;
});