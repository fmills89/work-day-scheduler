// Variables that will target DOM elements
var currentDayEl = document.querySelector("#currentDay");
const m = moment().format('LLL');
    currentDayEl.textContent = m;


